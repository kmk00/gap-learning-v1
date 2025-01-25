import { Head } from "@inertiajs/react";
import Navigation from "./Sections/Navigation";
import Informations from "./Sections/Informations";

import AnswerList from "./TextGap/AnswerList";
import { TextGapSteps, useExerciseStore } from "@/store/exercise";
import PrepareTextStep from "./TextGap/PrepareTextStep";
import WordsSelection from "./TextGap/WordsSelection";
import FinalPage from "./TextGap/FinalPage";

const stepsList = [
    "Paste your text and click “Prepare Text” button.",
    "Select words where you want to create a gap",
    "The word will be added to the list of guessing words",
    "After selecting all of the words of your choice save the exercise",
];

export default function TextGap() {
    const { step } = useExerciseStore();

    const renderStep = () => {
        switch (step) {
            case TextGapSteps.PREPARE_TEXT:
                return <PrepareTextStep />;

            case TextGapSteps.SELECT_WORDS:
                return (
                    <>
                        <WordsSelection />
                        <AnswerList />
                    </>
                );

            case TextGapSteps.SAVE_EXERCISE:
                return <FinalPage />;

            default:
                return null;
        }
    };

    return (
        <div>
            <Head title="Text Gap" />
            <Navigation />
            <main className="max-w-3xl mx-auto">{renderStep()}</main>
            <Informations
                title="Instruction for Text GAP"
                stepsList={stepsList}
            />
        </div>
    );
}
