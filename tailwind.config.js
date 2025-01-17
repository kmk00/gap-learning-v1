import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.tsx",
    ],

    daisyui: {
        themes: [
            "dracula",
            "dark",
            "cmyk",
            {
                customTheme: {
                    primary: "#fc0070",

                    "primary-content": "#160004",

                    secondary: "#0073ff",

                    "secondary-content": "#000516",

                    accent: "#00b0ff",

                    "accent-content": "#000b16",

                    neutral: "#100700",

                    "neutral-content": "#c9c6c2",

                    "base-100": "#202127",

                    "base-200": "#1a1b20",

                    "base-300": "#15161a",

                    "base-content": "#cdcdcf",

                    info: "#00beff",

                    "info-content": "#000d16",

                    success: "#00ec96",

                    "success-content": "#001308",

                    warning: "#f17e00",

                    "warning-content": "#140500",

                    error: "#ff656a",

                    "error-content": "#160304",
                },
            },
        ],
    },

    plugins: [forms, require("daisyui")],
};
