import { User } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import React from "react";

const Navigation = () => {
    const user = usePage().props.auth.user;

    return (
        <nav className="bg-base-200 flex items-center justify-end p-2">
            {user ? (
                <div className="flex justify-between w-full">
                    <span className="me-2">Howdy, {user.name}!</span>
                    <Link href={route("logout")} method="post">
                        Logout
                    </Link>
                </div>
            ) : (
                <div className="flex gap-4">
                    <Link href={route("login")}>Login</Link>
                    <Link href={route("register")}>Register</Link>
                </div>
            )}
        </nav>
    );
};

export default Navigation;
