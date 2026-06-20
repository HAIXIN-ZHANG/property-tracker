const jestConfig = {
  clearMocks: true,
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^styled-system/(.*)$": "<rootDir>/styled-system/$1"
  },
  modulePathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/styled-system/"],
  setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"],
  testEnvironment: "jest-environment-jsdom",
  testMatch: ["<rootDir>/src/**/*.test.{ts,tsx}", "<rootDir>/tests/**/*.test.{ts,tsx}"],
  testPathIgnorePatterns: ["<rootDir>/tests/e2e/"],
  watchman: false,
  transform: {
    "^.+\\.(t|j)sx?$": [
      "@swc/jest",
      {
        jsc: {
          parser: {
            syntax: "typescript",
            tsx: true
          },
          transform: {
            react: {
              runtime: "automatic"
            }
          }
        },
        module: {
          type: "commonjs"
        }
      }
    ]
  }
};

export default jestConfig;
