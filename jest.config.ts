import type { JestConfigWithTsJest } from "ts-jest"

const config: JestConfigWithTsJest = {
  verbose: true,
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testPathIgnorePatterns: [],
}

export default config
