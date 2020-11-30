module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "typeface-*": "identity-obj-proxy",
    ".+\\.(css|styl|less|sass|scss)$": `identity-obj-proxy`,
  },
  testPathIgnorePatterns: [`node_modules`, `.cache`, `public`],
  transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`, `\\.svg`],
  globals: {
    __PATH_PREFIX__: ``,
  },
  testRegex: "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx)$",
  moduleFileExtensions: ["ts", "tsx", "js"],
  collectCoverage: false,
  coverageReporters: ["lcov", "text", "html"],
}
