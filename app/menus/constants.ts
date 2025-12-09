import { svgList } from "@/static/svgs/svgList"

interface MenuMapping {
  name: string
  iconName: keyof typeof svgList
  iconColor: string
  pathName: string
}

export const MENU_MAPPINGS: MenuMapping[] = [
  {
    name: "뱃지",
    iconName: "medal",
    iconColor: "secondary-yellow",
    pathName: "/user/badges",
  },
  {
    name: "근육 성장률",
    iconName: "gauge",
    iconColor: "secondary-purple",
    pathName: "/user/gauges",
  },
  {
    name: "근로그",
    iconName: "calendar",
    iconColor: "secondary-pink",
    pathName: "/user/logs",
  },
  {
    name: "운동목록",
    iconName: "paper",
    iconColor: "secondary-blue",
    pathName: "/exercises",
  },
]
