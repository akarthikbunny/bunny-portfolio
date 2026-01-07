import js from "@eslint/js";
import globals from "globals";
import nextPlugin from "@next/eslint-plugin-next";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";

export default [
    {
        ignores: [".next/*", "node_modules/*"]
    },
    js.configs.recommended,
    {
        files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
        plugins: {
            "@next/next": nextPlugin,
            react: reactPlugin,
            "react-hooks": reactHooksPlugin,
        },
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        settings: {
            react: {
                version: "detect",
            },
        },
        rules: {
            ...reactPlugin.configs.recommended.rules,
            ...reactHooksPlugin.configs.recommended.rules,
            ...nextPlugin.configs.recommended.rules,
            ...nextPlugin.configs["core-web-vitals"].rules,
            "react/react-in-jsx-scope": "off",
            "react/prop-types": "off",
        },
    },
];
