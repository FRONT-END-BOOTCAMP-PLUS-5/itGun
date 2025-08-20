import type { Meta, StoryObj } from "@storybook/nextjs"
import Character from "./Character"
import { blink, dumbbellCurl } from "@/utils/animations"

const data = {
  characterColor: "#cdc1ff",
  assets: [
    {
      id: 1,
      level: 0,
      type: "FACE",
      svg: '<g\n        id="face"\n        xmlns="http://www.w3.org/2000/svg"\n        transform="translate(-68.408258-4.079687)"\n      >\n        <path\n          d="M327.54732,239.67322v-5h-5v-40h5v-5h7.5v-5h30v5h7.5v5h5v40h-5v5h-7.5v5h-30v-5h-7.5Z"\n          transform="translate(-141.273391-156.82868)"\n          stroke="#3d2c4b"\n          strokeWidth="2"\n        />\n        <g>\n          <line\n            id="eyes"\n            x1="0"\n            y1="-2.66733"\n            x2="0"\n            y2="4.33267"\n            transform="translate(198.77393 55.17721)"\n            fill="none"\n            stroke="#3d2c4b"\n            strokeWidth="3"\n          />\n          <line\n            id="eyes"\n            x1="0"\n            y1="-2.66733"\n            x2="0"\n            y2="4.33267"\n            transform="translate(208.773929 55.177211)"\n            fill="none"\n            stroke="#3d2c4b"\n            strokeWidth="3"\n          />\n        </g>\n      </g>',
      characterId: 1,
    },
    {
      id: 2,
      level: 0,
      type: "TORSO",
      svg: '<path\n        id="torso-0"\n        xmlns="http://www.w3.org/2000/svg"\n        d="M170,101.56073h60v5h10v105h-80v-105h10v-5Z"\n        transform="translate(-59.634329-10.309407)"\n        stroke="#3d2c4b"\n        strokeWidth="2"\n      />',
      characterId: 1,
    },
    {
      id: 7,
      level: 0,
      type: "ARMS",
      svg: '<>\n      <g\n        xmlns="http://www.w3.org/2000/svg"\n        transform="matrix(.992247 0.124281-.124281 0.992247-184.005833-39.821081)"\n      >\n        <path\n          id="left-upper-arm-0"\n          d="M350.8714,182.50358v-40h2.5v-2.80187h2.5v-2.5h10v2.5h2.5v2.80187h2.5v40h-2.5v2.19813h-2.5v2.5h-10v-2.5h-2.5v-2.19813h-2.5Z"\n          transform="translate(-70.8714 -30.165404)"\n          stroke="#3d2c4b"\n          strokeWidth="2"\n        />\n        <path\n          id="left-under-arm-0"\n          d="M350.8714,182.50358v-40h2.5v-2.80187h2.5v-2.5h10v2.5h2.5v2.80187h2.5v40h-2.5v2.19813h-2.5v2.5h-10v-2.5h-2.5v-2.19813h-2.5Z"\n          transform="translate(-70.8714 23.701334)"\n          stroke="#3d2c4b"\n          strokeWidth="2"\n        />\n      </g>\n      <g\n        xmlns="http://www.w3.org/2000/svg"\n        transform="matrix(.996927-.078332 0.078332 0.996927-79.677111 17.436015)"\n      >\n        <path\n          id="right-upper-arm-0"\n          d="M350.8714,182.50358v-40h2.5v-2.80187h2.5v-2.5h10v2.5h2.5v2.80187h2.5v40h-2.5v2.19813h-2.5v2.5h-10v-2.5h-2.5v-2.19813h-2.5Z"\n          transform="translate(-97.502327 -30.223779)"\n          stroke="#3d2c4b"\n          strokeWidth="2"\n        />\n        <path\n          id="right-under-arm-0"\n          d="M350.8714,182.50358v-40h2.5v-2.80187h2.5v-2.5h10v2.5h2.5v2.80187h2.5v40h-2.5v2.19813h-2.5v2.5h-10v-2.5h-2.5v-2.19813h-2.5Z"\n          transform="translate(-97.502327 23.701334)"\n          stroke="#3d2c4b"\n          strokeWidth="2"\n        />\n      </g>\n    </>',
      characterId: 1,
    },
    {
      id: 12,
      level: 0,
      type: "LEGS",
      svg: '<>\n      <path\n        id="left-leg-0"\n        xmlns="http://www.w3.org/2000/svg"\n        d="M165,209.77073h25v108.21h-60v-15h10v-5h10v-5h15v-83.21Z"\n        transform="translate(-52.890489-10.435168)"\n        stroke="#3d2c4b"\n        strokeWidth="2"\n      />\n      <path\n        id="right-leg-0"\n        xmlns="http://www.w3.org/2000/svg"\n        d="M165,209.77073h25v108.21h-60v-15h10v-5h10v-5h15v-83.21Z"\n        transform="translate(-17.134329-10.435168)"\n        stroke="#3d2c4b"\n        strokeWidth="2"\n      />\n</>',
      characterId: 1,
    },
    {
      id: 19,
      level: 0,
      type: "SWEAT",
      svg: '<path\n      id="sweat"\n      xmlns="http://www.w3.org/2000/svg"\n      d="M197.730464,74.12906v-2.11145h-1.657935v-1.999866h-1.199999v-9.599355h1.199999v-3.599758h1.657935v-2.688227h1.608767v-3.711343h3.199998v3.711343h1.591231v2.688227h1.542071v3.599758h1.199999v9.599355h-1.199999v1.999866h-1.542063v2.11145h-6.400004Z"\n      transform="translate(-46.168973-8.215511)"\n      fill="#bfcfef"\n      stroke="#3d2c4b"\n      strokeWidth="2"\n    />',
      characterId: 1,
    },
    {
      id: 17,
      level: 0,
      type: "DUMBBELL_LEFT",
      svg: '<g\n      id="dumbbel-left"\n      xmlns="http://www.w3.org/2000/svg"\n      transform="translate(-271.911899 66.790249)"\n    >\n      <rect\n        width="48.336905"\n        height="8.486743"\n        rx="0"\n        ry="0"\n        transform="translate(325.277965 127.59474)"\n        fill="#898b8f"\n        stroke="#3d2c4b"\n        strokeWidth="2"\n      />\n      <rect\n        width="14.68463"\n        height="32"\n        rx="0"\n        ry="0"\n        transform="translate(317.93565 114.838112)"\n        fill="#020202"\n        stroke="#3d2c4b"\n        strokeWidth="2"\n      />\n      <rect\n        width="14.68463"\n        height="32"\n        rx="0"\n        ry="0"\n        transform="translate(366.272555 114.838112)"\n        fill="#020202"\n        stroke="#3d2c4b"\n        strokeWidth="2"\n      />\n    </g>',
      characterId: 1,
    },
    {
      id: 18,
      level: 0,
      type: "DUMBBELL_RIGHT",
      svg: '<g\n      id="dumbbel-right"\n      xmlns="http://www.w3.org/2000/svg"\n      transform="translate(-148.214586 65.745612)"\n    >\n      <rect\n        width="48.336905"\n        height="8.486743"\n        rx="0"\n        ry="0"\n        transform="translate(325.277965 127.59474)"\n        fill="#898b8f"\n        stroke="#3d2c4b"\n        strokeWidth="2"\n      />\n      <rect\n        width="14.68463"\n        height="32"\n        rx="0"\n        ry="0"\n        transform="translate(317.93565 114.838112)"\n        fill="#020202"\n        stroke="#3d2c4b"\n        strokeWidth="2"\n      />\n      <rect\n        width="14.68463"\n        height="32"\n        rx="0"\n        ry="0"\n        transform="translate(366.272555 114.838112)"\n        fill="#020202"\n        stroke="#3d2c4b"\n        strokeWidth="2"\n      />\n    </g>',
      characterId: 1,
    },
  ],
}

const meta: Meta<typeof Character> = {
  title: "Components/Atoms/Character",
  component: Character,
  tags: ["autodocs"],
  argTypes: {
    characterColor: {
      control: "color",
    },
  },
}

export default meta
type Story = StoryObj<typeof Character>

export const Level1Character: Story = {
  args: {
    assets: data.assets,
    characterColor: data.characterColor,
    animation: () => {
      blink("eyes")
      dumbbellCurl(0)
    },
  },
}
