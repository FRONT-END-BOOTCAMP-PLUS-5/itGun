import { Button } from "@/ds/components/atoms/button/Button"
import { Input } from "@/ds/components/atoms/input/Input"
import { S2 } from "@/ds/components/atoms/text/TextWrapper"
import { Dropdown } from "@/ds/components/molecules/dropdown/Dropdown"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { UserInfoProps } from "../types"
import { genderOptions, numberOptions } from "./constants"

const UserInfo: React.FC<UserInfoProps> = ({ isEdit, setIsEdit }) => {
  const { data: session } = useSession()
  const [nickname, setNickname] = useState(session?.user?.nickName)
  const [height, setHeight] = useState(session?.user?.height ?? "-")
  const [weight, setWeight] = useState(session?.user?.weight ?? "-")
  const [age, setAge] = useState<number | string>(10)
  const [gender, setGender] = useState<number | string>(
    session?.user?.gender ?? "선택하지 않음"
  )

  const handleClickSave = () => {
    setIsEdit(false)
  }

  return (
    <div className="relative mt-[40px] flex h-full w-full flex-col gap-[40px]">
      <Input
        value={nickname}
        size={"lg"}
        isFullWidth={true}
        readOnly={isEdit ? false : true}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setNickname(e.target.value)
        }
      />
      <Input
        value={height}
        size={"lg"}
        isFullWidth={true}
        readOnly={isEdit ? false : true}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setHeight(e.target.value)
        }
      />
      <Input
        value={weight}
        size={"lg"}
        isFullWidth={true}
        readOnly={isEdit ? false : true}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setWeight(e.target.value)
        }
      />
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
        <div className="absolute bottom-10 w-full">
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
      )}
    </div>
  )
}

export default UserInfo
