import { Answer } from "@/types";
import { useEffect, useState } from "react";

type Props = {
    text: string;
    answerList: Answer[];
    setStep: React.Dispatch<React.SetStateAction<number>>;
    setAnswerList: React.Dispatch<React.SetStateAction<Answer[]>>;
    setAnswerNumberToRemove: React.Dispatch<
        React.SetStateAction<number | null>
    >;
    answerNumberToRemove: number | null;
};

const WordsSelection = ({
    text: textProp,
    setStep,
    setAnswerList,
    answerNumberToRemove,
    setAnswerNumberToRemove,
    answerList,
}: Props) => {
    const [textAsArray, setTextAsArray] = useState<Answer[]>(
        textProp.split(" ").map((word, index) => ({
            index: index,
            answerWord: word,
            selected: false,
            answerNumber: null,
        }))
    );

    useEffect(() => {
        if (answerNumberToRemove === null) return;

        setTextAsArray((prev) => {
            const updatedArray = prev.map((w) => {
                if (w.answerNumber === answerNumberToRemove) {
                    return { ...w, selected: false, answerNumber: null };
                }
                return w;
            });

            const finalArray = updatedArray.map((w) => {
                if (!w.selected) return w;

                const numberBefore = updatedArray.filter(
                    (other) => other.selected && other.index < w.index
                ).length;

                return { ...w, answerNumber: numberBefore + 1 };
            });

            const selectedWords = finalArray
                .filter((w) => w.selected)
                .sort((a, b) => a.index - b.index);

            setAnswerList(selectedWords);
            setAnswerNumberToRemove(null);
            return finalArray;
        });
    }, [answerNumberToRemove]);

    const handleSelectWord = (word: Answer) => {
        if (word.selected) {
            return;
        }
        setTextAsArray((prev) => {
            // First, mark the new word as selected
            const updatedArray = prev.map((w) => {
                if (w.index === word.index) {
                    return { ...w, selected: true };
                }
                return w;
            });

            // Then reassign all answer numbers based on position
            const finalArray = updatedArray.map((w) => {
                if (!w.selected) return w;

                // Count how many selected words come before this one
                const numberBefore = updatedArray.filter(
                    (other) => other.selected && other.index < w.index
                ).length;

                return { ...w, answerNumber: numberBefore + 1 };
            });

            // Update answer list with all selected words in order
            const selectedWords = finalArray
                .filter((w) => w.selected)
                .sort((a, b) => a.index - b.index);

            setAnswerList(selectedWords);

            return finalArray;
        });
    };

    const selectedWords = textAsArray.filter((word) => word.selected);

    return (
        <div>
            <div className="flex gap-4 my-4 items-center">
                <button
                    onClick={() => setStep(1)}
                    className="btn btn-outline disabled:opacity-45"
                >
                    Edit text
                </button>
                <button
                    onClick={() => {
                        console.log(textAsArray);
                        console.log(answerList);
                    }}
                    className="btn btn-outline disabled:opacity-45"
                >
                    Answer
                </button>
            </div>
            <div className="flex gap-4 flex-wrap mt-4 ">
                {textAsArray.map((word, index) => (
                    <p
                        className="hover:bg-secondary-content/20 cursor-pointer hover:text-secondary p-1 rounded-md"
                        key={index}
                        onClick={() => handleSelectWord(word)}
                        data-word={word}
                    >
                        {word.selected
                            ? `...${word.answerNumber}...`
                            : word.answerWord}
                    </p>
                ))}
            </div>
            <hr className="my-12 border-primary lg:my-20" />
        </div>
    );
};

export default WordsSelection;
