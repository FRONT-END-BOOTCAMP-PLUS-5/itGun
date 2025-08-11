import storybook from "eslint-plugin-storybook"
import { dirname } from "path"
import { fileURLToPath } from "url"
import { FlatCompat } from "@eslint/eslintrc"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

import unusedImports from "eslint-plugin-unused-imports"

const eslintConfig = [
  {
    plugins: {
      "unused-imports": unusedImports,
    },
    rules: {
      "unused-imports/no-unused-imports": "warn",
    },
  },
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript", "prettier"],
  }),
  ...storybook.configs["flat/recommended"],
]

export default eslintConfig
