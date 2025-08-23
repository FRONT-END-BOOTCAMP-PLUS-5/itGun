import ExercisesPage from "@/app/exercises/page"
import { Header } from "@/ds/components/molecules/header/Header"

interface ExerciseListModalProps {
  setOpen: (open: boolean) => void
}
const ExerciseListModal = ({ setOpen }: ExerciseListModalProps) => {
  return (
    <div className="bg-white-200 fixed inset-0 z-[100] mx-auto min-h-screen max-w-[430px] overflow-y-auto [&>main]:mt-[70px] [&>main]:px-[30px]">
      <Header className="sticky top-0" onBack={() => setOpen(false)} />
      <ExercisesPage />
    </div>
  )
}

export default ExerciseListModal
