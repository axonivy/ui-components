/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
  singleQuote: true,
  jsxSingleQuote: true,
  arrowParens: 'avoid',
  trailingComma: 'none',
  endOfLine: 'lf',
  printWidth: 140,
  tabWidth: 2,
  overrides: [
    {
      files: ['*.spec.ts', '*.spec.tsx'],
      options: {
        printWidth: 180
      }
    },
    {
      files: ['*.json', '*.yml'],
      options: {
        printWidth: 100
      }
    }
  ],
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindFunctions: ['clsx', 'cn', 'cva']
};

export default config;
