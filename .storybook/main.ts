import type { StorybookConfig } from "@storybook/nextjs"
import { join, dirname } from "path"

function getAbsolutePath(value: string) {
  return dirname(require.resolve(join(value, "package.json")))
}

const config: StorybookConfig = {
  stories: ["../ds/components/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    getAbsolutePath("@chromatic-com/storybook"),
    getAbsolutePath("@storybook/addon-docs"),
    getAbsolutePath("@storybook/addon-onboarding"),
    getAbsolutePath("@storybook/addon-a11y"),
    getAbsolutePath("@storybook/addon-vitest"),
  ],
  framework: {
    name: getAbsolutePath("@storybook/nextjs"),
    options: {},
  },
  staticDirs: ["../public"],
}
export default config
