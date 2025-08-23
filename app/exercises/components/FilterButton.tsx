import { C2 } from "@/ds/components/atoms/text/TextWrapper"
import { useLogsStore } from "@/hooks/useLogsStore"
import { useRouter, useSearchParams } from "next/navigation"

interface FilterButtonProps {
  item: { label: string; value: string }
  filterType: "bodyPart" | "equipment"
}

const FilterButton = ({ item, filterType }: FilterButtonProps) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { mode } = useLogsStore()

  const bodyPart = searchParams.get("bodyPart") || ""
  const equipment = searchParams.get("equipment") || ""

  const isActive =
    filterType === "bodyPart"
      ? bodyPart === item.value
      : equipment === item.value

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

    router.replace(`/${mode}?${currentParams.toString()}`)
  }

  return (
    <button
      key={item.label}
      onClick={() => handleFilter({ type: filterType, value: item.value })}
      className={`border-primary text-primary flex h-6 w-fit items-center rounded-md border border-dashed p-2 whitespace-nowrap ${
        filterType === "bodyPart"
          ? isActive
            ? "bg-secondary-purple border-solid"
            : "border-dashed"
          : isActive
            ? "bg-secondary-yellow border-solid"
            : "border-dashed"
      }`}
    >
      <C2>{item.label}</C2>
    </button>
  )
}

export default FilterButton
