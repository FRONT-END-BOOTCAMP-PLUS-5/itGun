import { Button } from "@/ds/components/atoms/button/Button"
import { Input } from "@/ds/components/atoms/input/Input"
import { B1, S2 } from "@/ds/components/atoms/text/TextWrapper"
import { Dropdown } from "@/ds/components/molecules/dropdown/Dropdown"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { UserInfoProps } from "@/app/user/types"
import { GENDER_OPTIONS, NUMBER_OPTIONS } from "@/app/user/constants"
import { useGetUserInfo } from "@/hooks/useGetUserInfo"
import { useUpdateUserInfo } from "@/hooks/useUpdateUserInfo"
import { Request } from "@/services/user/info/updateUserInfo"
import { useDeleteUserInfo } from "@/hooks/useDeleteUserInfo"
import { useDialogStore } from "@/hooks/useDialogStore"
import { useModalStore } from "@/hooks/useModalStore"
import PasswordCheckModal from "./PasswordCheckModal"
import PasswordInput from "./PasswordInput"

const UserInfo: React.FC<UserInfoProps> = ({ isEdit, setIsEdit, color }) => {
  const { data: session, update } = useSession()
  const [isAuth, setIsAuth] = useState<boolean>(false)
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
  const [password, setPassword] = useState({
    password: "",
    passwordConfirm: "",
    validate: false,
  })

  const { showDialog } = useDialogStore()
  const { data } = useGetUserInfo()
  const { mutateAsync: updateUserInfo } = useUpdateUserInfo()
  const { mutate: deleteUserInfo } = useDeleteUserInfo()
  const { openModal, closeModal } = useModalStore()

  const setInit = () => {
    setNickName(session?.user?.nickName ?? "")
    setHeight(session?.user?.height ?? "")
    setWeight(session?.user?.weight ?? "")
    setAge(session?.user?.age ?? 10)
    setGender(session?.user?.gender ?? "선택하지 않음")
    setIsAuth(false)
    setPassword({
      password: "",
      passwordConfirm: "",
      validate: false,
    })
  }

  useEffect(() => {
    setInit()
  }, [session])

  useEffect(() => {
    if (data) {
      if (data?.nickName) setNickName(data.nickName)
      if (data?.height) setHeight(data.height)
      if (data?.weight) setWeight(data.weight)
      if (data?.age) setAge(data.age)
      if (data?.gender) setGender(data.gender)
    }
  }, [data])

  useEffect(() => {
    if (isAuth) {
      closeModal()
    }
  }, [isAuth])

  const handleClickPasswordCheck = () => {
    openModal(<PasswordCheckModal setIsAuth={setIsAuth} />)
  }

  const handleClickSave = () => {
    if (isAuth && !password?.validate) {
      showDialog({
        message: `비밀번호 변경을 하지 않고
        저장하시겠습니까?`,
        variant: "error",
        buttons: [
          {
            text: "네",
            onClick: () => {
              changeUserInfo()
            },
          },
          {
            text: "아니오",
            onClick: () => {},
          },
        ],
      })
      return
    }

    changeUserInfo()
  }

  const changeUserInfo = async () => {
    const payload = {
      nickName,
      height: Number(height),
      weight: Number(weight),
      age: Number(age),
      gender: gender === "선택하지 않음" ? "none" : gender,
      characterColor: color,
    } as Request

    if (isAuth && password?.validate) {
      payload.password = password.password
    }
    await updateUserInfo(payload)
    update({ user: payload })
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
    <div className="relative mt-[40px] flex h-full w-full flex-col px-[4px]">
      <div className="flex h-[calc(100%-100px)] w-full flex-col gap-[40px] overflow-y-scroll">
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
          options={NUMBER_OPTIONS}
          readOnly={isEdit ? false : true}
          onChange={setAge}
          className={isEdit ? "!text-primary" : ""}
        />
        <Dropdown
          value={gender}
          options={GENDER_OPTIONS}
          readOnly={isEdit ? false : true}
          onChange={setGender}
          className={isEdit ? "!text-primary" : ""}
        />
        {isEdit && (
          <>
            {isAuth ? (
              <PasswordInput password={password} setPassword={setPassword} />
            ) : (
              <Button
                variant="outline"
                isFullWidth={true}
                onClick={handleClickPasswordCheck}
              >
                비밀번호 변경하기
              </Button>
            )}
            <div className="flex w-full justify-end">
              <Button variant="ghost" size="xs" onClick={handleClickWithdrawal}>
                <B1 variant="disable" className="border-b">
                  탈퇴하기
                </B1>
              </Button>
            </div>
          </>
        )}
      </div>

      {isEdit && (
        <div className="absolute bottom-[10px] left-1/2 w-full -translate-x-1/2 px-[4px]">
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
