import { Head } from "@inertiajs/react";
import Navigation from "./Sections/Navigation";
import Informations from "./Sections/Informations";

export default function TextGap() {
    const stepsList = [
        "Paste your text and click “Prepare Text” button.",
        "Select words where you want to create a gap",
        "The word will be added to the list of guessing words",
        "After selecting all of the words of your choice save the exercise",
    ];

    return (
        <div>
            <Head title="Text Gap" />
            <Navigation />
            <Informations
                title="Instruction for Text GAP"
                stepsList={stepsList}
            />
        </div>
    );
}
