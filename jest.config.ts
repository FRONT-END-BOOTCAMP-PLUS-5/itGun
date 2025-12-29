import type { JestConfigWithTsJest } from "ts-jest"

const config: JestConfigWithTsJest = {
  verbose: true,
  testEnvironment: "jsdom",
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
    "^.+\\.m?js$": [
      "babel-jest",
      {
        presets: [["next/babel", { "preset-react": { runtime: "automatic" } }]],
      },
    ],
  },

  transformIgnorePatterns: [
    "node_modules/(?!.pnpm|msw|@mswjs|until-async|cross-fetch)",
  ],

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  setupFiles: ["<rootDir>/jest.polyfills.ts"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
}

export default config
