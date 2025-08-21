import LoadingText from "@/app/components/loading/LoadingText"
import { useGetExercises } from "@/hooks/useGetExercises"
import { useSearchParams } from "next/navigation"
import { Fragment } from "react"

function ExercisesLists() {
  const searchParams = useSearchParams()

  const q = searchParams.get("q") || ""
  const bodyPart = searchParams.get("bodyPart") || ""
  const equipment = searchParams.get("equipment") || ""

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useGetExercises({ limit: 10, q, bodyPart, equipment })

  return (
    <section className="relative size-full">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
          <LoadingText />
        </div>
      )}

      <ul className="flex flex-col gap-2.5">
        {data?.pages.map((page, i) => (
          <Fragment key={i}>
            {page.data.map((exercise) => (
              <li key={exercise.exerciseId}>{exercise.name}</li>
            ))}
          </Fragment>
        ))}
      </ul>
    </section>
  )
}

export default ExercisesLists
