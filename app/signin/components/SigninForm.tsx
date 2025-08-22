"use client"

import { useSignin } from "@/hooks/useSignin"
import { useState } from "react"
import Title from "../../components/title/Title"
import { Input } from "@/ds/components/atoms/input/Input"
import { Button } from "@/ds/components/atoms/button/Button"
import { S1 } from "@/ds/components/atoms/text/TextWrapper"

const SigninForm = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { signin } = useSignin()

  const isFormValid = email.trim() !== "" && password.trim() !== ""

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await signin(email, password)
  }

  return (
    <div className="flex h-full w-full flex-col gap-10">
      <Title title="로그인" subTitle="잇근과 함께 득근하세요!" />
      <form
        className="flex h-full flex-col justify-between"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-10">
          <Input
            placeholder="email"
            size="lg"
            isFullWidth={true}
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            className="border-b-2"
          />
          <Input
            type="password"
            placeholder="password"
            size="lg"
            isFullWidth={true}
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            className="border-b-2"
          />
        </div>
        <div className="-mx-3 py-2.5">
          <Button
            variant={isFormValid ? "primary" : "disable"}
            isFullWidth={true}
            type="submit"
          >
            <S1 variant="white-200">로그인</S1>
          </Button>
        </div>
      </form>
    </div>
  )
}

export default SigninForm
