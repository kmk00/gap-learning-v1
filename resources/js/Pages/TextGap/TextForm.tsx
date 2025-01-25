const TextForm = () => {
    return (
        <form className="form-control relative">
            <textarea
                {...register("text")}
                className="textarea bg-base-200"
                rows={10}
                placeholder="Paste your text here..."
            ></textarea>
            <span className="absolute right-4 bottom-4  text-gray-400">
                {textLength}/{MAX_TEXT_LENGTH}
            </span>
        </form>
    );
};

export default TextForm;
