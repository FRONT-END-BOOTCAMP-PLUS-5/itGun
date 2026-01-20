import { PasswordCheckModalProps } from "../types"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { slideup } from "@/utils/animations"
import { S1 } from "@/ds/components/atoms/text/TextWrapper"
import { Input } from "@/ds/components/atoms/input/Input"
import React, { useState } from "react"
import { Button } from "@/ds/components/atoms/button/Button"
import { useCheckPassword } from "@/hooks/useCheckPassword"

const PasswordCheckModal = ({ setIsAuth }: PasswordCheckModalProps) => {
  const [password, setPassword] = useState<string | undefined>("")
  const { mutate } = useCheckPassword({
    checkValid: () => setIsAuth(true),
  })
  gsap.registerPlugin(useGSAP)
  useGSAP(() => {
    slideup("modal-container", 300, 0.5)
  })

  const checkPassword = async () => {
    if (password) mutate(password)
  }

  return (
    <div
      id="password-check-container"
      className="flex h-[300px] w-full flex-col border-x-2 border-t-2 border-(--color-primary) bg-(--color-white-200) p-5"
    >
      <S1>비밀번호 확인</S1>
      <div className="mt-6 flex flex-col gap-[20px]">
        <Input
          type="password"
          value={password}
          size={"lg"}
          className="text-primary"
          isFullWidth={true}
          placeholder="기존 비밀번호를 입력하세요"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value)
          }}
        />
        <div className="flex justify-end">
          <Button size="sm" onClick={checkPassword}>
            Click me!
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PasswordCheckModal
