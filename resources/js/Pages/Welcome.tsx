import ActionText from "@/Components/ActionText";
import ExcersiceCards from "@/Sections/CardsContainer";
import Hero from "@/Sections/Hero";
import Navigation from "@/Sections/Navigation";
import Purpose from "@/Sections/Purpose";
import { Head } from "@inertiajs/react";

export default function Welcome() {
    return (
        <>
            <Head title="Welcome" />
            <Navigation />
            <div className="px-4 py-4 mx-auto max-w-screen-2xl">
                <Hero />
                <ActionText label="FILL THE GAP IN YOUR BRAIN WITH KNOWLEDGE!" />
                <ExcersiceCards />
                <hr className="my-12 border-primary lg:my-20" />
                <Purpose />
            </div>
        </>
    );
}
