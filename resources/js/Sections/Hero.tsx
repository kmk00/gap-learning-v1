import ActionButton from "@/Components/ActionButton";

const Hero = () => {
    return (
        <header className="grid lg:grid-cols-2 gap-4 items-center">
            <div>
                <h1 className="text-4xl lg:text-5xl text-balance">
                    Master New Skills with Interactive Gap-Fill Exercises!
                </h1>
                <p className="text-lg lg:text-xl text-balance mt-2 opacity-65">
                    Learn Faster, Retain More: Practice by Filling in the
                    Missing Pieces.
                </p>
                <ActionButton className="mt-12" label="Get Started" />
            </div>
            <div>{/* TODO: Add animation here */}</div>
        </header>
    );
};

export default Hero;
