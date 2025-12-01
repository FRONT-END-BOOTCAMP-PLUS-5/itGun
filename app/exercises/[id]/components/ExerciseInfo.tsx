"use client"

import { C2, H2 } from "@/ds/components/atoms/text/TextWrapper"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useGetExerciseInfo } from "@/hooks/useGetExerciseInfo"
import { LabelProps } from "../../types"

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

const ExerciseInfo = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true)
  const { data } = useGetExerciseInfo(id)

  useEffect(() => {
    if (data) {
      setLoading(false)
    }
  }, [data])

  return (
    <div className="mb-10 flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <H2 variant="primary" className="break-keep">
          {data?.nameKo}
        </H2>

        <div className="flex gap-2">
          <nav className="flex gap-2">
            {data?.equipmentsKo?.map((eq) => (
              <Label key={eq} text={eq} filterType="equipment" />
            ))}
          </nav>
          <nav className="flex gap-2">
            {data?.bodyPartsKo?.map((bp) => (
              <Label key={bp} text={bp} filterType="bodyPart" />
            ))}
          </nav>
        </div>
      </div>

      {loading && (
        <div className="color-primary text-center text-xs">로딩 중...</div>
      )}
      {data?.videoUrl ? (
        <>
          <div className="aspect-video w-full">
            <video
              src={data?.videoUrl}
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
        data?.imageUrl && (
          <div className="relative h-[200px]">
            <Image
              src={data.imageUrl}
              alt={data.name}
              fill
              className="rounded-lg object-contain"
              onLoad={() => setLoading(false)}
            />
          </div>
        )
      )}

      {data?.instructionsKo && data?.instructionsKo.length > 0 && (
        <div className="w-full">
          <div className="border p-5">
            <h2 className="text-lg font-semibold">운동 방법</h2>
            <ol className="ml-5 list-decimal space-y-1 text-xs">
              {data?.instructionsKo.map((step, i) => (
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

export default ExerciseInfo
