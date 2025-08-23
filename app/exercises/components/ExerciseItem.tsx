import { C2 } from "@/ds/components/atoms/text/TextWrapper"
import Image from "next/image"
import { ExerciseItemProps } from "./types"

const ExerciseItem = ({
  exercise,
  isLastitem,
  lastItemRef,
  handleClickExercise,
}: ExerciseItemProps) => {
  return (
    <li
      key={exercise.exerciseId}
      ref={isLastitem ? lastItemRef : null}
      onClick={() => handleClickExercise(exercise)}
      className="grid grid-cols-[auto_1fr] grid-rows-[1fr_1fr]"
    >
      <div className="col-start-1 row-span-2 mr-3.5 h-[115px] w-[115px] content-center overflow-hidden">
        <Image
          src={exercise.imageUrl}
          alt={exercise.name}
          width={115}
          height={115}
          className="max-h-[115px] object-contain object-center"
        />
      </div>

      <C2 fontWeight="bold" className="col-start-2 row-start-1 self-end">
        {exercise.name}
      </C2>
      <C2 className="col-start-2 row-start-2 self-start">
        {exercise.bodyParts}
      </C2>
    </li>
  )
}

export default ExerciseItem
