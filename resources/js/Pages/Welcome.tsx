import { PageProps } from "@/types";
import { Head, Link } from "@inertiajs/react";

export default function Welcome() {
    return (
        <>
            <Head title="Welcome" />
            <div className="bg-primary">Hello</div>
        </>
    );
}
