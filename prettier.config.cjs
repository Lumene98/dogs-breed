/** @type {import("prettier").Config} */
const config = {
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
  semi: true,
  trailingComma: "all",
  singleQuote: false,
  jsxSingleQuote: false,
  printWidth: 80,
  tabWidth: 2,
  arrowParens: "always",
};

module.exports = config;
