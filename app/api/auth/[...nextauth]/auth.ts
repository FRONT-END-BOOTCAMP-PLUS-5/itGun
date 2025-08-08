import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrUserRepository } from "@/backend/infrastructure/repositories/PrUserRepository"

import { CreateUserUsecase } from "@/backend/application/signup/usecases/CreateUserUsecase"
import { SignInUsecase } from "@/backend/application/signin/usecases/SignInUsecase"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        nickname: { label: "Nickname", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        if (credentials.nickname) {
          const userRepository = new PrUserRepository()
          const createUserUsecase = new CreateUserUsecase(userRepository)

          try {
            const result = await createUserUsecase.execute({
              email: credentials.email,
              password: credentials.password,
              nickName: credentials.nickname,
            })

            if (result.status === 201 && result.user) {
              return result.user
            }

            if (result.status === 400 || result.status === 401) {
              console.log("🚫 인증 실패:", result.message)
            }

            return null
          } catch (error) {
            console.error("NextAuth authorize error:", error)
            return null
          }
        }

        try {
          const userRepository = new PrUserRepository()

          const signInUsecase = new SignInUsecase(userRepository)

          const result = await signInUsecase.execute({
            email: credentials.email,

            password: credentials.password,
          })

          if (result.status === 200 && result.user) {
            return result.user
          }

          if (result.status === 400 || result.status === 401) {
            console.log("🚫 인증 실패:", result.message)
          }

          return null
        } catch (error) {
          console.error("NextAuth authorize error:", error)

          return null
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 7,
  },
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      console.log(123, user)
      if (user) {
        token.id = user.id
        token.email = user.email
        token.nickName = user.nickName
        token.age = user.age
        token.gender = user.gender
        token.height = user.height
        token.weight = user.weight
        token.characterColor = user.characterColor
        token.characterId = user.characterId
      }
      return token
    },
    async session({ session, token }) {
      console.log(456, token)
      if (token && session.user) {
        session.user.id = token.id
        session.user.email = token.email
        session.user.nickName = token.nickName
        session.user.age = token.age
        session.user.gender = token.gender
        session.user.height = token.height
        session.user.weight = token.weight
        session.user.characterColor = token.characterColor
        session.user.characterId = token.characterId
      }
      return session
    },
  },
}
