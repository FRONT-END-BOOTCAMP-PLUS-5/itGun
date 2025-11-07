import { Button } from "@/ds/components/atoms/button/Button"
import { Input } from "@/ds/components/atoms/input/Input"
import { B1, S2 } from "@/ds/components/atoms/text/TextWrapper"
import { Dropdown } from "@/ds/components/molecules/dropdown/Dropdown"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { UserInfoProps } from "../types"
import { genderOptions, numberOptions } from "./constants"
import { useGetUserInfo } from "@/hooks/useGetUserInfo"
import { useUpdateUserInfo } from "@/hooks/useUpdateUserInfo"
import { Request } from "@/services/user/info/updateUserInfo"
import { useDeleteUserInfo } from "@/hooks/useDeleteUserInfo"
import { useDialogStore } from "@/hooks/useDialogStore"

const UserInfo: React.FC<UserInfoProps> = ({ isEdit, setIsEdit, color }) => {
  const { data: session } = useSession()
  const [nickName, setNickName] = useState<string>(
    session?.user?.nickName ?? ""
  )
  const [height, setHeight] = useState<number | string>(
    session?.user?.height ?? ""
  )
  const [weight, setWeight] = useState<number | string>(
    session?.user?.weight ?? ""
  )
  const [age, setAge] = useState<number | string>(10)
  const [gender, setGender] = useState<number | string>(
    session?.user?.gender ?? "선택하지 않음"
  )

  const { showDialog } = useDialogStore()
  const { data } = useGetUserInfo()
  const { mutate: updateUserInfo } = useUpdateUserInfo()
  const { mutate: deleteUserInfo } = useDeleteUserInfo()

  useEffect(() => {
    if (data) {
      if (data?.nickName) setNickName(data.nickName)
      if (data?.height) setHeight(data.height)
      if (data?.weight) setWeight(data.weight)
      if (data?.age) setAge(data.age)
      if (data?.gender) setGender(data.gender)
    }
  }, [data])

  const handleClickSave = () => {
    const payload = {
      nickName,
      height: Number(height),
      weight: Number(weight),
      age,
      gender: gender === "선택하지 않음" ? "none" : gender,
      characterColor: color,
    } as Request
    updateUserInfo(payload)
    if (session?.user) {
      session.user.nickName = nickName
      session.user.height = Number(height)
      session.user.weight = Number(weight)
      session.user.age = Number(age)
      session.user.gender = String(gender)
      session.user.characterColor = color
    }
    setIsEdit(false)
  }

  const handleClickWithdrawal = () => {
    showDialog({
      message: `캐릭터와 운동기록이 
      모두 사라집니다. 💔
      정말 탈퇴하시겠습니까?`,
      variant: "error",
      buttons: [
        {
          text: "네",
          onClick: () => {
            deleteUserInfo()
          },
        },
        {
          text: "아니오",
          onClick: () => {},
        },
      ],
    })
  }

  return (
    <div className="relative mt-[40px] flex h-full w-full flex-col gap-[40px]">
      <Input
        value={nickName}
        size={"lg"}
        className={isEdit ? "text-primary" : "text-secondary"}
        isFullWidth={true}
        readOnly={isEdit ? false : true}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setNickName(e.target.value)
        }
      />
      <div
        className={`border-secondary flex items-center justify-between border-b-1`}
      >
        <Input
          value={height}
          inputMode="numeric"
          size={"lg"}
          className={`border-none ${isEdit ? "text-primary" : "text-secondary"}`}
          isFullWidth={true}
          readOnly={isEdit ? false : true}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setHeight(e.target.value)
          }
        />
        <B1 variant={isEdit ? "primary" : "secondary"}>cm</B1>
      </div>
      <div
        className={`border-secondary flex items-center justify-between border-b-1`}
      >
        <Input
          value={weight}
          inputMode="numeric"
          size={"lg"}
          className={`border-none ${isEdit ? "text-primary" : "text-secondary"}`}
          isFullWidth={true}
          readOnly={isEdit ? false : true}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setWeight(e.target.value)
          }
        />
        <B1 variant={isEdit ? "primary" : "secondary"}>kg</B1>
      </div>
      <Dropdown
        value={age}
        options={numberOptions}
        readOnly={isEdit ? false : true}
        onChange={setAge}
      />
      <Dropdown
        value={gender}
        options={genderOptions}
        readOnly={isEdit ? false : true}
        onChange={setGender}
      />

      {isEdit && (
        <div className="mt-[20px] flex w-full justify-end">
          <Button variant="ghost" size="xs" onClick={handleClickWithdrawal}>
            <B1 variant="disable" className="border-b">
              탈퇴하기
            </B1>
          </Button>
        </div>
      )}

      {isEdit && (
        <div className="absolute bottom-[10px] w-full">
          <div className="-mx-3">
            <Button
              variant="primary"
              isFullWidth={true}
              onClick={handleClickSave}
            >
              <S2 variant="white-200" fontWeight="bold">
                저장
              </S2>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserInfo
