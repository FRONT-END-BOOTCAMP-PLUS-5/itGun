import type { JestConfigWithTsJest } from "ts-jest"

const config: JestConfigWithTsJest = {
  extensionsToTreatAsEsm: [],
  verbose: true,
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  transform: {},
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  testPathIgnorePatterns: [],
}

export default config
