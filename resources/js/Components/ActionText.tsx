interface Props {
    className?: string;
    label?: string;
}

const ActionText = ({ className, label }: Props) => {
    return (
        <p
            className={`lg:my-40 my-20 text-center text-4xl lg:text-6xl font-bold  ${className}`}
        >
            {label}
        </p>
    );
};

export default ActionText;
