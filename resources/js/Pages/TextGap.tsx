import { Head } from "@inertiajs/react";
import Navigation from "./Sections/Navigation";
import Informations from "./Sections/Informations";
import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import WordsSelection from "./TextGap/WordsSelection";
import { Answer } from "@/types";
import AnswerList from "./TextGap/AnswerList";

const textSchema = z.object({
    text: z
        .string({ required_error: "Text is required" })
        .min(3, { message: "The text must be longer than 3 characters" })
        .max(600, { message: "The text must be shorter than 600 characters" }),
});
type FormData = z.infer<typeof textSchema>;

const stepsList = [
    "Paste your text and click “Prepare Text” button.",
    "Select words where you want to create a gap",
    "The word will be added to the list of guessing words",
    "After selecting all of the words of your choice save the exercise",
];

export default function TextGap() {
    const [step, setStep] = useState(1);
    const [answerList, setAnswerList] = useState<Answer[]>([]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
    } = useForm<FormData>({
        resolver: zodResolver(textSchema),
        defaultValues: {
            text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis deserunt fugit architecto tenetur amet aperiam animi saepe corporis veritatis placeat! Labore saepe excepturi asperiores velit, ab iste quasi illum neque!",
        },
    });

    const [answerNumberToRemove, setAnswerNumberToRemove] = useState<
        number | null
    >(null);

    const textValue = watch("text");
    const textLength = textValue ? textValue.length : 0;

    // Reset errors when text is cleared
    if (textValue === "") {
        reset();
    }

    const handleRemoveAnswerByNumber = (answerNumber: number) => {
        if (!answerNumber) return;
        setAnswerNumberToRemove(answerNumber);
    };

    const onSubmit = (data: FormData) => {
        setStep(step + 1);
    };

    return (
        <div>
            <Head title="Text Gap" />
            <Navigation />
            <main className="max-w-3xl mx-auto">
                {step === 1 && (
                    <>
                        <div className="flex gap-4 my-4 items-center">
                            <button
                                onClick={handleSubmit(onSubmit)}
                                disabled={
                                    !textValue ||
                                    errors.text?.message !== undefined
                                }
                                className="btn btn-outline disabled:opacity-45"
                            >
                                Prepare Text
                            </button>
                            <button
                                onClick={() => reset()}
                                disabled={
                                    !textValue ||
                                    errors.text?.message !== undefined
                                }
                                className="btn btn-outline disabled:opacity-45"
                            >
                                Clear
                            </button>
                            {errors.text && textValue && (
                                <span className="text-error">
                                    {errors.text?.message}
                                </span>
                            )}
                        </div>
                        <form className="form-control relative">
                            <textarea
                                {...register("text")}
                                className="textarea bg-base-200"
                                rows={10}
                                placeholder="Paste your text here..."
                            ></textarea>
                            <span className="absolute right-4 bottom-4  text-gray-400">
                                {textLength}/600
                            </span>
                        </form>
                    </>
                )}
                {step === 2 && (
                    <>
                        <WordsSelection
                            answerList={answerList}
                            setStep={setStep}
                            setAnswerList={setAnswerList}
                            setAnswerNumberToRemove={setAnswerNumberToRemove}
                            answerNumberToRemove={answerNumberToRemove}
                            text={textValue}
                        />
                        <AnswerList
                            removeAnswerByNumber={handleRemoveAnswerByNumber}
                            answerList={answerList}
                        />
                    </>
                )}
            </main>
            <Informations
                title="Instruction for Text GAP"
                stepsList={stepsList}
            />
        </div>
    );
}
