import { Answer } from "@/types";
import { useEffect, useState } from "react";

type Props = {
    answerList: Answer[];
    removeAnswerByNumber: (answerNumber: number) => void;
};

const AnswerList = ({ answerList, removeAnswerByNumber }: Props) => {
    const [answerListSorted, setAnswerListSorted] =
        useState<Answer[]>(answerList);

    useEffect(() => {
        answerList.sort((a, b) => a.answerNumber! - b.answerNumber!);

        setAnswerListSorted(answerList);
    }, [answerList]);

    const handleRemoveWord = (word: Answer) => {
        console.log(word);
    };

    return (
        <div>
            {answerListSorted.map((word, index) => (
                <div className="flex items-center gap-2" key={index}>
                    <p>
                        ({word.answerNumber}) {word.answerWord}
                    </p>
                    <button
                        onClick={() => removeAnswerByNumber(word.answerNumber!)}
                        className="text-red-500 hover:text-red-700"
                        aria-label="Remove word"
                    >
                        ×
                    </button>
                </div>
            ))}
        </div>
    );
};

export default AnswerList;
