import { TextGapSteps, useExerciseStore } from "@/store/exercise";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const MAX_TEXT_LENGTH = 1000;

const textSchema = z.object({
    text: z
        .string({ required_error: "Text is required" })
        .nonempty({ message: "Text is required" })
        .max(MAX_TEXT_LENGTH, {
            message: `The text must be shorter than ${MAX_TEXT_LENGTH} characters`,
        }),
});
type FormData = z.infer<typeof textSchema>;

const PrepareTextStep = () => {
    const { setStep, setExerciseTextArray, exerciseTextArray } =
        useExerciseStore();

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

    const onSubmit = () => {
        const words = textValue.trim().split(" ");

        if (words.length < 3) {
            setError("text", {
                message: "Text must contain at least 3 words",
            });

            return;
        }

        const textArray = textValue.split(" ").map((word, index) => ({
            index: index,
            answerWord: word,
            selected: false,
            answerNumber: null,
        }));

        setExerciseTextArray(textArray);

        setStep(TextGapSteps.SELECT_WORDS);
    };

    const handleClear = () => {
        reset();
    };

    return (
        <div>
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
                    <span className="text-error">{errors.text?.message}</span>
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
        </div>
    );
};

export default PrepareTextStep;
