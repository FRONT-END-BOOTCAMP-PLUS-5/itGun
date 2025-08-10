import type { Preview } from "@storybook/nextjs"
import "../ds/styles/globals.css"
import { galmuri } from "@/utils/fonts"

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className={galmuri.className}>
        <Story />
      </div>
    ),
  ],
}

export default preview
