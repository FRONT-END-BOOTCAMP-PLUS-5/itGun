import { Exercise } from "@/services/exercises/getExercises"

export interface ExerciseItemProps {
  exercise: Exercise
  isLastitem: boolean
  lastItemRef: (node: HTMLLIElement | null) => void
  handleClickExercise: (exercise: Exercise) => void
}

export interface FilterButtonProps {
  item: { label: string; value: string }
  filterType: "bodyPart" | "equipment"
}

export interface DetailModalProps {
  exercise: Exercise
}

export interface LabelProps {
  text: string
  filterType: "bodyPart" | "equipment"
}
