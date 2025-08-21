import Icon from "@/ds/components/atoms/icon/Icon"
import { B2, H2 } from "@/ds/components/atoms/text/TextWrapper"
import { HeaderProps } from "../../types"
import { Button } from "@/ds/components/atoms/button/Button"
import { useDialogStore } from "@/hooks/useDialogStore"
import { useDeleteUserLog } from "@/hooks/useDeleteUserLog"

function formatDate(date: string): string {
  const parsedDate = new Date(date)
  const year = parsedDate.getFullYear()
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0")
  const day = String(parsedDate.getDate()).padStart(2, "0")
  return `${year}/${month}/${day}`
}

const LogSummaryHeader = ({ id, date, duration }: HeaderProps) => {
  const { showDialog } = useDialogStore()
  const { mutate } = useDeleteUserLog(id)

  const onClickDelete = () => {
    showDialog({
      message: "정말 운동 기록을\n삭제 하실건가요?",
      variant: "error",
      buttons: [
        { text: "네", onClick: () => mutate() },
        { text: "아니요", onClick: () => {} },
      ],
    })
  }
  return (
    <div className="flex w-full justify-between">
      <div className="flex flex-col gap-1">
        <H2>{date && formatDate(date)}</H2>
        <B2>총 {duration}분 운동하셨군요!</B2>
      </div>
      <Button
        size="xs"
        variant="ghost"
        className="-mt-5 -mr-3"
        onClick={onClickDelete}
      >
        <Icon name="bin" size={40} />
      </Button>
    </div>
  )
}

export default LogSummaryHeader
