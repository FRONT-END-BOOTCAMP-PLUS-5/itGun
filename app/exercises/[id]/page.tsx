import ExerciseInfo from "./ExerciseInfo"

const ExerciseDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params

  return <ExerciseInfo id={id} />
}

export default ExerciseDetailPage
