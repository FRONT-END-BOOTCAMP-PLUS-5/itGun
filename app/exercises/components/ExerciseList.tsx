"use client"

import Loading from "@/app/loading"
import { C2 } from "@/ds/components/atoms/text/TextWrapper"
import { useGetExercises } from "@/hooks/useGetExercises"
import { useLogsStore } from "@/hooks/useLogsStore"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { Fragment, useRef } from "react"

function ExerciseList() {
  const searchParams = useSearchParams()
  const { mode, setOpen, setData } = useLogsStore()
  const q = searchParams.get("q") || ""
  const bodyPart = searchParams.get("bodyPart") || ""
  const equipment = searchParams.get("equipment") || ""

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetExercises({ limit: 10, q, bodyPart, equipment })

  const observerRef = useRef<IntersectionObserver>(null)
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

  const handleExercise = (exercise: object) => {
    if (mode === "exercises") return
    setOpen(false)
    setData(exercise)
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
                <li
                  key={exercise.exerciseId}
                  ref={isLastitem ? lastItemRef : null}
                  onClick={() => handleExercise(exercise)}
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

                  <C2
                    fontWeight="bold"
                    className="col-start-2 row-start-1 self-end"
                  >
                    {exercise.name}
                  </C2>
                  <C2 className="col-start-2 row-start-2 self-start">
                    {exercise.bodyParts}
                  </C2>
                </li>
              )
            })}
          </Fragment>
        ))}
      </ul>

      {isFetchingNextPage && <C2 className="py-4 text-center">Loading...</C2>}
    </section>
  )
}

export default ExerciseList
