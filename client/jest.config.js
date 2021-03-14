module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  testEnvironmentOptions: { resources: "usable" },
  roots: ["./src"],
  transform: {
    "\\.ts$": ["ts-jest"],
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js",
    "^.+\\.svg$": "<rootDir>/__mocks__/svgMock.js",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  automock: false,
  setupFilesAfterEnv: ["<rootDir>/test-setup.js"],
};
