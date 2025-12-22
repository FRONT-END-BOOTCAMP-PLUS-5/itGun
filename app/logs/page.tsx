import AddWorkoutForm from "./components/AddWorkoutForm"
import DateTimeInput from "./components/DateTimeInput"
import WorkoutLogSaveButton from "./components/WorkoutLogSaveButton"
import WorkoutTypeSelector from "./components/WorkoutTypeSelector"

const LogsPage = () => {
  return (
    <main className="flex h-full w-full flex-col gap-7 pb-[10px]">
      <DateTimeInput />
      <WorkoutTypeSelector />
      <AddWorkoutForm />
      <WorkoutLogSaveButton />
    </main>
  )
}

export default LogsPage
