interface InformationsProps {
    title: string;
    stepsList: string[];
}

const Informations = ({ title, stepsList }: InformationsProps) => {
    return (
        <div className="bg-base-300 py-4 px-8 my-6 rounded-xl w-fit mx-auto">
            <h2 className="text-2xl font-bold text-center pb-4">{title}</h2>
            <ol className="list-decimal space-y-2 list-inside">
                {stepsList.map((step, index) => (
                    <li key={index}>{step}</li>
                ))}
            </ol>
        </div>
    );
};

export default Informations;
