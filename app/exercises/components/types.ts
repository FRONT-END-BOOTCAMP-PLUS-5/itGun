import { Exercise } from "@/services/exercises/getExercises"

export interface ExerciseItemProps {
  exercise: Exercise
  isLastitem: boolean
  lastItemRef: (node: HTMLLIElement | null) => void
  handleClickExercise: (exercise: Exercise) => void
}
