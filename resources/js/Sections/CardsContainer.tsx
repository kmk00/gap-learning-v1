import ExcersiceCard from "./ExerciseCard";

const ExcersiceCards = () => {
    const functionalities = [
        "Fill in the missing words",
        "Create a story",
        "Write a poem",
        "Translate a sentence",
        "Summarize a text",
    ];

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ExcersiceCard
                    smallTitle="Text gap"
                    title="Fill the missing words inside your text"
                    functionalities={functionalities}
                    link="/textgap"
                />
                <ExcersiceCard
                    smallTitle="Table fill"
                    title="Fill the missing words inside your text"
                    functionalities={functionalities}
                    link="/tablefill"
                />
                <ExcersiceCard
                    smallTitle="Crossword"
                    title="Fill the missing words inside your text"
                    functionalities={functionalities}
                    link="/crossword"
                />
            </div>
        </div>
    );
};

export default ExcersiceCards;
