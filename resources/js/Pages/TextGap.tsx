import { Head } from "@inertiajs/react";
import Navigation from "./Sections/Navigation";
import Informations from "./Sections/Informations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useMemo, useState } from "react";
import WordsSelection from "./TextGap/WordsSelection";
import AnswerList from "./TextGap/AnswerList";
import FinalPage from "./TextGap/FinalPage";

const MAX_TEXT_LENGTH = 1000;

//! TODO FIX IMPORT ERROR
export type Answer = {
    readonly index: number;
    readonly answerWord: string;
    selected: boolean;
    answerNumber: number | null;
};

//! TODO Move to separate file
export enum TextGapSteps {
    PREPARE_TEXT = 1,
    SELECT_WORDS = 2,
    SAVE_EXERCISE = 3,
}

const textSchema = z.object({
    text: z
        .string({ required_error: "Text is required" })
        .nonempty({ message: "Text is required" })
        .max(MAX_TEXT_LENGTH, {
            message: `The text must be shorter than ${MAX_TEXT_LENGTH} characters`,
        }),
});
type FormData = z.infer<typeof textSchema>;

const stepsList = [
    "Paste your text and click “Prepare Text” button.",
    "Select words where you want to create a gap",
    "The word will be added to the list of guessing words",
    "After selecting all of the words of your choice save the exercise",
];

export default function TextGap() {
    const [step, setStep] = useState<TextGapSteps>(TextGapSteps.PREPARE_TEXT);
    const [answerList, setAnswerList] = useState<Answer[]>([]);
    const [answerNumberToRemove, setAnswerNumberToRemove] = useState<
        number | null
    >(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setError,
        watch,
    } = useForm<FormData>({
        resolver: zodResolver(textSchema),
    });

    const textValue = watch("text");
    const textLength = textValue?.length ?? 0;
    const hasErrors = Boolean(errors.text?.message);
    const isTextValid = textValue && !hasErrors;

    if (textValue === "") {
        reset();
    }

    const handleRemoveAnswerByNumber = (answerNumber: number) => {
        if (!answerNumber) return;
        setAnswerNumberToRemove(answerNumber);
    };

    const onSubmit = () => {
        const words = textValue.trim().split(" ");

        if (words.length < 3) {
            setError("text", {
                message: "Text must contain at least 3 words",
            });

            return;
        }

        setStep(TextGapSteps.SELECT_WORDS);
    };

    const handleClear = () => {
        reset();
        setAnswerList([]);
    };

    const renderStep = useMemo(() => {
        switch (step) {
            case TextGapSteps.PREPARE_TEXT:
                return (
                    <>
                        <div className="flex gap-4 my-4 items-center">
                            <button
                                onClick={handleSubmit(onSubmit)}
                                disabled={!isTextValid}
                                className="btn btn-outline disabled:opacity-45"
                            >
                                Prepare Text
                            </button>
                            <button
                                onClick={handleClear}
                                disabled={!isTextValid}
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
                                {textLength}/{MAX_TEXT_LENGTH}
                            </span>
                        </form>
                    </>
                );

            case TextGapSteps.SELECT_WORDS:
                return (
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
                );

            case TextGapSteps.SAVE_EXERCISE:
                return <FinalPage />;

            default:
                return null;
        }
    }, [step, textValue, errors, textLength, answerList, answerNumberToRemove]);

    return (
        <div>
            <Head title="Text Gap" />
            <Navigation />
            <main className="max-w-3xl mx-auto">{renderStep}</main>
            <Informations
                title="Instruction for Text GAP"
                stepsList={stepsList}
            />
        </div>
    );
}
