import type { JestConfigWithTsJest } from "ts-jest"

const config: JestConfigWithTsJest = {
  verbose: true,
  testEnvironment: "jest-fixed-jsdom",
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "mjs",
    "cjs",
    "jsx",
    "json",
    "node",
  ],
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: {
          jsx: "react-jsx",
        },
      },
    ],
    "^.+\\.m?js$": "babel-jest",
  },

  transformIgnorePatterns: ["node_modules/(?!.pnpm|msw|@mswjs|until-async)"],

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
}

export default config
