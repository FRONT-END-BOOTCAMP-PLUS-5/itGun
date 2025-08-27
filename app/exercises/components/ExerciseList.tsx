"use client"

import Loading from "@/app/loading"
import { C2 } from "@/ds/components/atoms/text/TextWrapper"
import { useGetExercises } from "@/hooks/useGetExercises"
import { useLogsStore } from "@/hooks/useLogsStore"
import { useSearchParams } from "next/navigation"
import { Fragment, useRef } from "react"
import ExerciseItem from "./ExerciseItem"

const ExerciseList = () => {
  const searchParams = useSearchParams()
  const { mode, setOpen, setData } = useLogsStore()
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
    if (mode === "exercises") return
    setOpen(false)
    setData(exercise)
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
