import { userLogProps } from "./types"
import LogDetailPage from "./components/LogDetailPage"

const UserlogPage = async ({ params }: userLogProps) => {
  const { id } = await params

  return <LogDetailPage id={id} />
}

export default UserlogPage
