// @ts-check

/** @type {import("prettier").Config} */
module.exports = {
	// Core
	arrowParens: "avoid",
	bracketSameLine: false,
	bracketSpacing: true,
	multilineArraysWrapThreshold: 1,
	organizeObjectProperties: "always",
	semi: true,
	singleAttributePerLine: true,
	singleQuote: false,
	trailingComma: "all",
	useTabs: true,

	// Plugins
	plugins: ["@ianvs/prettier-plugin-sort-imports"],

	// Sort Imports
	importOrder: [
		"<BUILTIN_MODULES>",
		"",
		"^react$",
		"",
		"<THIRD_PARTY_MODULES>",
		"",
		"^@(/.*)$",
		"^[./]",
	],
	importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
	importOrderTypeScriptVersion: "5.0.0",
};
