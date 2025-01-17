import { Link } from "@inertiajs/react";

interface Props {
    className?: string;
    title: string;
    smallTitle: string;
    functionalities: string[];
    image?: string;
    link: string;
}

const ExcersiceCard = ({
    className,
    title,
    smallTitle,
    functionalities,
    image,
    link,
}: Props) => {
    return (
        <div className={`rounded-xl bg-base-200 p-4 ${className}`}>
            <div className="">
                <p className="text-sm opacity-75">{smallTitle}</p>
                <h2 className="text-2xl mt-1 font-bold">{title}</h2>
                <ul className="list-disc ml-4 mt-4">
                    {functionalities.map((functionality, index) => (
                        <li key={index}>{functionality}</li>
                    ))}
                </ul>

                <div className="w-full mt-4 flex justify-end">
                    <Link className="btn btn-outline px-8" href={link}>
                        Start excersice
                    </Link>
                </div>

                {image && <img src={image} alt={title} />}
            </div>
        </div>
    );
};

export default ExcersiceCard;
