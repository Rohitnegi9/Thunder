const js = require("@eslint/js");
const globals = require("globals");

module.exports = [
    js.configs.recommended,

    {
        files: ["src/**/*.js"],
        languageOptions: {
            globals: globals.node
        }
    },

    {
        files: ["tests/**/*.js"],
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.jest
            }
        }
    }
];