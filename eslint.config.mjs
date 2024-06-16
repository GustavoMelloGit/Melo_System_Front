import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import react from "eslint-plugin-react";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: ["**/cypress", "**/*.d.ts", "**/*.config.ts"],
}, ...fixupConfigRules(compat.extends(
    "plugin:react/recommended",
    "standard-with-typescript",
    "prettier",
    "plugin:react-hooks/recommended",
)), {
    plugins: {
        react: fixupPluginRules(react),
        "@typescript-eslint": typescriptEslint,
    },

    languageOptions: {
        globals: {
            ...globals.browser,
        },

        parser: tsParser,
        ecmaVersion: "latest",
        sourceType: "module",

        parserOptions: {
            project: ["./tsconfig.json"],
        },
    },

    settings: {
        react: {
            version: "detect",
        },
    },

    rules: {
        "react/react-in-jsx-scope": "off",
        "@typescript-eslint/strict-boolean-expressions": "off",
        "@typescript-eslint/no-misused-promises": "off",
        "@typescript-eslint/consistent-type-definitions": ["warn", "type"],
        "@typescript-eslint/return-await": "off",
        "react/display-name": "off",
        "@typescript-eslint/consistent-type-assertions": "off",
        "no-new": "off",
        "@typescript-eslint/prefer-nullish-coalescing": "warn",
        "@typescript-eslint/non-nullable-type-assertion-style": "off",
        "@typescript-eslint/unbound-method": "off",
        "no-redeclare": "off",
        "@typescript-eslint/no-extraneous-class": "off",
    },
}];