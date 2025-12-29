"use client"

import Loading from "@/app/loading"
import { C2 } from "@/ds/components/atoms/text/TextWrapper"
import { useGetExercises } from "@/hooks/useGetExercises"
import { useExerciseLogStore } from "@/hooks/useExerciseLogStore"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Fragment, useRef } from "react"
import ExerciseItem from "./ExerciseItem"
import { Exercise } from "@/services/exercises/getExercises"
import { FormData, workoutTypes } from "@/app/logs/types"

const ExerciseList = () => {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { setFormData } = useExerciseLogStore()
  const q = searchParams.get("q") || ""
  const bodyPart = searchParams.get("bodyPart") || ""
  const equipment = searchParams.get("equipment") || ""

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetExercises({ limit: 10, q, bodyPart, equipment })

  const observerRef = useRef<IntersectionObserver | null>(null)
  const lastItemRef = (node: HTMLLIElement | null) => {
    if (isLoading || isFetchingNextPage) return

    if (observerRef.current) observerRef.current.disconnect()

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage()
      }
    })

    if (node) observerRef.current.observe(node)
  }

  const handleClickExercise = (exercise: object) => {
    if (pathname.startsWith("/exercises")) return
    setFormData((prev) => [
      ...prev,
      {
        title: (exercise as Exercise).name,
        type: workoutTypes[
          (exercise as Exercise).exerciseType
        ] as FormData["type"],
        exerciseInfo: {
          exerciseId: (exercise as Exercise).exerciseId,
          name: (exercise as Exercise).name,
          imageUrl: (exercise as Exercise).imageUrl,
          videoUrl: (exercise as Exercise).videoUrl,
          bodyParts: (exercise as Exercise).bodyParts,
          equipments: (exercise as Exercise).equipments,
          exerciseType: (exercise as Exercise).exerciseType,
          instructions: (exercise as Exercise).instructions,
          exerciseTips: (exercise as Exercise).exerciseTips,
        },
        data: [{ setCount: 1 }],
      },
    ])
    router.replace("/logs")
  }

  if (data?.pages[0].data.length === 0) {
    return (
      <C2 className="text-center">
        아직 등록되지 않은 운동이에요 😅 <br />
        다른 키워드로 검색해보세요!
      </C2>
    )
  }

  return (
    <section className="relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.1)]">
          <Loading />
        </div>
      )}

      <ul className="flex flex-col gap-2.5">
        {data?.pages.map((page, pageIndex) => (
          <Fragment key={pageIndex}>
            {page.data?.map((exercise, exerciseIndex) => {
              const isLastitem = exerciseIndex === page.data.length - 1
              return (
                <ExerciseItem
                  key={exercise.exerciseId}
                  exercise={exercise}
                  isLastitem={isLastitem}
                  lastItemRef={lastItemRef}
                  handleClickExercise={handleClickExercise}
                />
              )
            })}
          </Fragment>
        ))}
      </ul>

      {isFetchingNextPage && (
        <C2 className="py-4 pb-[30px] text-center">Loading...</C2>
      )}
    </section>
  )
}

export default ExerciseList
