import { useExerciseStore } from "@/store/exercise";
import { TextGapSteps } from "@/store/exercise";

const FinalPage = () => {
    const { exerciseTextArray, setStep } = useExerciseStore();

    return (
        <div>
            <div className="flex gap-4 my-4 items-center">
                <button
                    type="button"
                    className="btn btn-outline disabled:opacity-45"
                    onClick={() => setStep(TextGapSteps.SELECT_WORDS)}
                >
                    Go back
                </button>
            </div>
            <div className="flex gap-4 flex-wrap mt-4 ">Answers</div>
            <hr className="my-12 border-primary lg:my-20" />
        </div>
    );
};

export default FinalPage;
