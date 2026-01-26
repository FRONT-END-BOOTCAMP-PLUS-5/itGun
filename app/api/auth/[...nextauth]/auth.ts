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

        const userRepository = new PrUserRepository()

        //닉네임 값 있는 경우 회원정보 로직!
        if (credentials.nickname) {
          const createUserUsecase = new CreateUserUsecase(userRepository)

          try {
            const result = await createUserUsecase.execute({
              email: credentials.email,
              password: credentials.password,
              nickName: credentials.nickname,
            })

            if (result.status === 201 && result.user) {
              const user = {
                id: result.user.id,
                email: result.user.email,
                nickName: result.user.nickName,
                age: result.user.age,
                gender: result.user.gender,
                height: result.user.height,
                weight: result.user.weight,
                characterColor: result.user.characterColor,
                characterId: result.user.characterId,
              }
              return user
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
          //닉네임 값 없는 경우 로그인 로직!
          const signInUsecase = new SignInUsecase(userRepository)

          const result = await signInUsecase.execute({
            email: credentials.email,
            password: credentials.password,
          })

          if (result.status === 200 && result.user) {
            const user = {
              id: result.user.id,
              email: result.user.email,
              nickName: result.user.nickName,
              age: result.user.age,
              gender: result.user.gender,
              height: result.user.height,
              weight: result.user.weight,
              characterColor: result.user.characterColor,
              characterId: result.user.characterId,
            }
            return user
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
    signIn: "/landing", //인증 만료시 랜딩페이지로 리다이랙트
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update" && session?.user) {
        token.nickName = session.user.nickName
        token.height = session.user.height
        token.weight = session.user.weight
        token.age = session.user.age
        token.gender = session.user.gender
        token.characterColor = session.user.characterColor
      }
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
