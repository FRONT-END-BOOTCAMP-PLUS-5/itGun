import ExercisesPage from "@/app/exercises/page"
import { Header } from "@/ds/components/molecules/header/Header"
import { ExerciseListModalProps } from "@/app/logs/types"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const ExerciseListModal = ({ setOpen }: ExerciseListModalProps) => {
  const router = useRouter()

  useEffect(() => {
    return () => {
      router.replace("/logs")
    }
  }, [])

  return (
    <div className="bg-white-200 scrollbar-none fixed inset-0 z-[100] mx-auto max-w-[430px] overflow-y-auto">
      <Header className="sticky top-0" onBack={() => setOpen(false)} />
      <div className="px-[30px] pt-[40px] pb-[30px]">
        <ExercisesPage />
      </div>
    </div>
  )
}

export default ExerciseListModal
