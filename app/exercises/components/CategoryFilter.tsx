import { BODY_PART_MAPPINGS, EQUIPMENT_MAPPINGS } from "../constants"
import FilterButton from "./FilterButton"

const CategoryFilter = () => {
  return (
    <section>
      <div className="scrollbar-none my-3 overflow-x-auto">
        <nav className="flex min-w-max gap-2">
          {BODY_PART_MAPPINGS.map((item) => (
            <FilterButton key={item.label} item={item} filterType="bodyPart" />
          ))}
        </nav>
      </div>
      <div className="scrollbar-none mb-5 overflow-x-auto">
        <nav className="flex min-w-max gap-2">
          {EQUIPMENT_MAPPINGS.map((item) => (
            <FilterButton key={item.label} item={item} filterType="equipment" />
          ))}
        </nav>
      </div>
    </section>
  )
}

export default CategoryFilter
