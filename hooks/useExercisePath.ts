import { usePathname } from "next/navigation"

export const useExercisesPath = () => {
  const pathname = usePathname()
  return pathname.startsWith("/logs") ? "/logs/exercises" : "/exercises"
}
