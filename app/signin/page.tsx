"use client"

import { useState } from "react"
import { Button } from "@/ds/components/atoms/button/Button"
import { Input } from "@/ds/components/atoms/input/Input"
import { C1, H1, S1 } from "@/ds/components/atoms/text/TextWrapper"
import { useSignin } from "@/hooks/useSignin"

const SignInPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { signin } = useSignin()

  const isFormValid = email.trim() !== "" && password.trim() !== ""

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await signin(email, password)
  }

  return (
    <form
      className="flex min-h-screen flex-col justify-between pt-10"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-10 px-7.5">
        <div className="flex flex-col gap-2.5">
          <H1>로그인</H1>
          <C1 variant="secondary">잇근과 함께 득근하세요!</C1>
        </div>
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
      </div>
      <div className="px-3.5 py-2.5">
        <Button
          variant={isFormValid ? "primary" : "disable"}
          isFullWidth={true}
          type="submit"
        >
          <S1 variant="white-200">로그인</S1>
        </Button>
      </div>
    </form>
  )
}

export default SignInPage
