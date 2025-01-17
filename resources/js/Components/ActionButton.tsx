interface Props {
    className?: string;
    label?: string;
    onClick?: () => void;
}

const ActionButton = ({ className, label, onClick }: Props) => {
    return (
        <button
            onClick={onClick}
            className={`btn btn-primary rounded-xl px-12 text-xl ${className}`}
        >
            {label}
        </button>
    );
};

export default ActionButton;
