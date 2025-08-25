import CategoryFilter from "./components/CategoryFilter"
import ExercisesLists from "./components/ExerciseList"
import SearchInput from "./components/SearchInput"

const ExercisesPage = () => {
  return (
    <main className="h-full w-full pb-[30px]">
      <SearchInput />
      <CategoryFilter />
      <ExercisesLists />
    </main>
  )
}

export default ExercisesPage
