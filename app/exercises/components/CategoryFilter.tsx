import { C2 } from "@/ds/components/atoms/text/TextWrapper"
import {
  BODY_PART_MAPPINGS,
  EQUIPMENT_MAPPINGS,
} from "../constants/exercisesConstants"
import { useRouter, useSearchParams } from "next/navigation"

function CategoryFilter() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const bodyPart = searchParams.get("bodyPart") || ""
  const equipment = searchParams.get("equipment") || ""

  const handleFilter = ({
    type,
    value,
  }: {
    type: "bodyPart" | "equipment"
    value: string
  }) => {
    const currentParams = new URLSearchParams(searchParams)

    if (value) currentParams.set(type, value)
    else currentParams.delete(type)

    router.replace(`/exercises?${currentParams.toString()}`)
  }

  return (
    <section>
      <div className="overflow-x-auto">
        <nav className="my-3 flex min-w-max gap-2">
          {BODY_PART_MAPPINGS.map((item) => (
            <button
              key={item.label}
              onClick={() =>
                handleFilter({ type: "bodyPart", value: item.value })
              }
              className={`border-primary text-primary flex h-6 w-full items-center rounded-md border border-dashed px-2 whitespace-nowrap ${
                bodyPart === item.value
                  ? "bg-secondary-purple border-solid"
                  : "border-dashed"
              }`}
            >
              <C2>{item.label}</C2>
            </button>
          ))}
        </nav>
      </div>
      <div className="overflow-x-auto">
        <nav className="my-3 flex min-w-max gap-2">
          {EQUIPMENT_MAPPINGS.map((item) => (
            <button
              key={item.label}
              onClick={() =>
                handleFilter({ type: "equipment", value: item.value })
              }
              className={`border-primary text-primary flex h-6 w-full items-center rounded-md border border-dashed px-2 whitespace-nowrap ${
                equipment === item.value
                  ? "bg-secondary-yellow border-solid"
                  : "border-dashed"
              }`}
            >
              <C2>{item.label}</C2>
            </button>
          ))}
        </nav>
      </div>
    </section>
  )
}

export default CategoryFilter
