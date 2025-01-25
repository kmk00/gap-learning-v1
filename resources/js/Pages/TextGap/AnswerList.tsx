import { useExerciseStore } from "@/store/exercise";
import { Answer } from "@/types";

const AnswerList = () => {
    const { exerciseTextArray, setExerciseTextArray } = useExerciseStore();

    if (exerciseTextArray.length === 0) {
        return null;
    }

    const answerList = exerciseTextArray.filter((word) => word.selected);

    const handleRemoveWord = (wordToRemove: Answer) => {
        const updatedArray = exerciseTextArray.map((word) => {
            if (word.answerNumber === wordToRemove.answerNumber) {
                return {
                    ...word,
                    selected: false,
                    answerNumber: null,
                };
            }

            if (word.answerNumber && word.index > wordToRemove.index) {
                return {
                    ...word,
                    answerNumber: word.answerNumber - 1,
                };
            }
            return word;
        });
        setExerciseTextArray(updatedArray);
    };

    return (
        <div>
            {answerList.map((word, index) => (
                <div className="flex items-center gap-2" key={index}>
                    <p>
                        ({word.answerNumber}) {word.answerWord}
                    </p>
                    <button
                        onClick={() => {
                            handleRemoveWord(word);
                        }}
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
