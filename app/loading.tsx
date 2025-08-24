import LoadingCharacter from "@/app/components/loading/LoadingCharacter"
import LoadingText from "@/app/components/loading/LoadingText"

const Loading = () => {
  return (
    <div className="flex h-full w-full flex-col items-center">
      <LoadingCharacter />
      <LoadingText text="Loading" />
    </div>
  )
}

export default Loading
