import { TextGapSteps, useExerciseStore } from "@/store/exercise";
import { Answer } from "@/types";

const WordsSelection = () => {
    const { setStep, exerciseTextArray, setExerciseTextArray } =
        useExerciseStore();

    const handleEditButton = () => {
        setStep(TextGapSteps.PREPARE_TEXT);
    };

    const handleAnswerButton = () => {
        setStep(TextGapSteps.SAVE_EXERCISE);
    };

    const handleSelectWord = (word: Answer) => {
        if (word.selected) {
            return;
        }

        let answerNumber = 0;

        const updatedArray = exerciseTextArray.map((w) => {
            if (w.index === word.index) {
                return {
                    ...w,
                    selected: true,
                    answerNumber: ++answerNumber,
                };
            }

            if (w.selected) {
                w.answerNumber = ++answerNumber;
            }

            return w;
        });

        setExerciseTextArray(updatedArray);
    };

    const renderWords = () => {
        return exerciseTextArray.map((word, index) => (
            <p
                className="hover:bg-secondary-content/20 cursor-pointer hover:text-secondary p-1 rounded-md"
                onClick={() => handleSelectWord(word)}
                key={index}
                data-word={word}
            >
                {word.selected ? `...${word.answerNumber}...` : word.answerWord}
            </p>
        ));
    };

    return (
        <div>
            <div className="flex gap-4 my-4 items-center">
                <button
                    type="button"
                    onClick={handleEditButton}
                    className="btn btn-outline disabled:opacity-45"
                >
                    Edit text
                </button>
                <button
                    type="button"
                    onClick={handleAnswerButton}
                    className="btn btn-outline disabled:opacity-45"
                >
                    Answer
                </button>
            </div>
            <div className="flex gap-4 flex-wrap mt-4 ">{renderWords()}</div>
            <hr className="my-12 border-primary lg:my-20" />
        </div>
    );
};

export default WordsSelection;
