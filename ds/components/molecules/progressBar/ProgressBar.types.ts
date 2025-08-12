export type ProgressBarVariant = {
  // 각 칸의 테두리 및 대괄호 색상
  borderColor: string
  // 채워지는 칸 색상
  fillColor: string
}

export type ProgressBarProps = {
  // 전체 최대값 (예: 5)
  max: number
  // 현재 값 (예: 1)
  value: number
  // 칸 개수 (예: 10)
  steps: number
  // 높이(px)
  size?: number
  // 색상 묶음 (기본: 테두리 존재)
  variant?: ProgressBarVariant
  // 사용자가 클릭하여 값을 변경할 때 호출되는 콜백
  onChange?: (nextValue: number) => void
}
