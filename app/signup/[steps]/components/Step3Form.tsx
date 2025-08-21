import { Input } from "@/ds/components/atoms/input/Input"
import { Dropdown } from "@/ds/components/molecules/dropdown/Dropdown"
import { useToastStore } from "@/hooks/useToastStore"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { ChangeEvent, useState, useTransition } from "react"
import { useSignup } from "../../context/SignupContext"
import { SignupData, Gender } from "../../context/SignupContext.types"
import ValidationItem from "./ValidationItem"
import { Button } from "@/ds/components/atoms/button/Button"

const Step3Form = () => {
  const { data } = useSignup()
  const { showToast } = useToastStore()
  const router = useRouter()

  const [isPending, startTransition] = useTransition()
  const [formData, setFormData] = useState({
    nickname: "",
    height: "",
    weight: "",
    gender: undefined as Gender | undefined,
    age: "",
  })
  const [validation, setValidation] = useState({
    length: false,
    simpleText: true,
    infoSuccess: false,
  })

  const validateCheck = (value: string) => {
    const length = value.length >= 1 && value.length <= 20
    const simpleText = !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/.test(value)
    const infoSuccess = length && simpleText

    return {
      length,
      simpleText,
      infoSuccess,
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    if (name === "nickname") {
      const result = validateCheck(value)
      setValidation(result)
    }
  }

  const handleDropdownChange = (name: string) => (value: string | number) => {
    if (name === "gender") {
      setFormData({ ...formData, gender: value as Gender })
    } else if (name === "age") {
      setFormData({ ...formData, age: value as string })
    }
  }

  const formAction = (formData: SignupData["step3"]) => {
    startTransition(async () => {
      const { nickname, height, weight, gender, age } = formData
      const email = data.step1.email
      const password = data.step2.password
      if (!email || !password || !nickname) {
        return alert("모든 필수 정보를 입력해주세요")
      }

      const values = {
        email,
        password,
        nickname,
        ...(height && { height }),
        ...(weight && { weight }),
        ...(gender && { gender }),
        ...(age && { age }),
      }

      try {
        await signIn("credentials", { ...values, redirect: false })
        showToast({
          message: "회원가입이 완료되었습니다!",
          variant: "success",
          position: "top",
        })
        setTimeout(() => {
          router.push("/")
        }, 1500)
      } catch (error) {
        showToast({
          message: "회원가입 실패 😢 다시 확인해주세요",
          variant: "error",
          position: "top",
        })
      }
    })
  }
  return (
    <form action={() => formAction(formData)} className="flex h-full flex-col">
      <div className="flex flex-1 flex-col gap-10">
        <div className="flex flex-col">
          <Input
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            placeholder="닉네임"
            isFullWidth
            size="lg"
          />
          <div className="flex gap-5">
            <ValidationItem label="20자 이하" isValid={validation.length} />
            <ValidationItem
              label="특수문자 제외"
              isValid={validation.simpleText}
            />
          </div>
        </div>
        <Input
          name="height"
          type="number"
          min={0}
          value={formData.height}
          onChange={handleChange}
          placeholder="키"
          isFullWidth
          size="lg"
        />
        <Input
          name="weight"
          type="number"
          min={0}
          value={formData.weight}
          onChange={handleChange}
          placeholder="몸무게"
          isFullWidth
          size="lg"
        />
        <Dropdown
          placeholder="나이"
          options={Array.from({ length: 93 }, (_, i) => ({
            label: `${i + 8}세`,
            value: String(i + 8),
          }))}
          value={formData.age}
          onChange={handleDropdownChange("age")}
        />
        <Dropdown
          placeholder="성별"
          options={[
            { label: "남자", value: "male" },
            { label: "여자", value: "female" },
            { label: "선택안함", value: "none" },
          ]}
          value={formData.gender}
          onChange={handleDropdownChange("gender")}
        />
      </div>

      <Button
        type="submit"
        isFullWidth
        size="lg"
        className="mb-6"
        disabled={isPending || !validation.infoSuccess}
        variant={isPending || !validation.infoSuccess ? "disable" : "primary"}
      >
        {isPending ? "처리 중..." : "회원가입"}
      </Button>
    </form>
  )
}

export default Step3Form
