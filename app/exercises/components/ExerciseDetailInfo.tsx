"use client"

import { C2, H2 } from "@/ds/components/atoms/text/TextWrapper"
import Image from "next/image"
import { useState } from "react"
import { DetailModalProps, LabelProps } from "./types"

const Label = ({ text, filterType }: LabelProps) => {
  return (
    <div
      className={`border-primary text-primary flex h-6 w-fit items-center rounded-md border border-dashed p-2 whitespace-nowrap ${
        filterType === "bodyPart"
          ? "bg-secondary-purple border-solid"
          : "bg-secondary-yellow border-solid"
      }`}
    >
      <C2>{text}</C2>
    </div>
  )
}

const ExerciseDetailInfo = ({ exercise }: DetailModalProps) => {
  const [loading, setLoading] = useState(true)

  return (
    <div className="flex max-h-[inherit] max-w-[inherit] flex-col gap-10">
      <div className="flex max-w-[310px] flex-col gap-2">
        <H2 variant="primary" className="break-keep">
          {exercise.name}
        </H2>

        <div className="flex gap-2">
          <nav className="flex min-w-max gap-2">
            {exercise.equipmentsKo?.map((eq) => (
              <Label key={eq} text={eq} filterType="equipment" />
            ))}
          </nav>
          <nav className="flex min-w-max gap-2">
            {exercise.bodyPartsKo?.map((bp) => (
              <Label key={bp} text={bp} filterType="bodyPart" />
            ))}
          </nav>
        </div>
      </div>

      {exercise.videoUrl ? (
        <>
          {loading && (
            <div className="color-primary text-center text-xs">로딩 중...</div>
          )}
          <div className="aspect-video w-full">
            <video
              src={exercise.videoUrl}
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
              onCanPlay={() => setLoading(false)}
              onWaiting={() => setLoading(true)}
            />
          </div>
        </>
      ) : (
        exercise.imageUrl && (
          <div className="relative h-[200px]">
            <Image
              src={exercise.imageUrl}
              alt={exercise.name}
              fill
              className="rounded-lg object-contain"
            />
          </div>
        )
      )}

      {exercise.instructions && exercise.instructions.length > 0 && (
        <div className="w-full">
          <div className="border p-5">
            <h2 className="text-lg font-semibold">운동 방법</h2>
            <ol className="ml-5 list-decimal space-y-1 text-xs">
              {exercise.instructions.map((step, i) => (
                <li className="my-3 break-keep" key={i}>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </div>
  )
}

export default ExerciseDetailInfo
