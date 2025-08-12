import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrUserRepository } from "@/backend/infrastructure/repositories/PrUserRepository"
import { JwtTokenRepository } from "@/backend/infrastructure/repositories/JwtTokenRepository"
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
        const tokenRepository = new JwtTokenRepository()

        //닉네임 값 있는 경우 회원정보 로직!
        if (credentials.nickname) {
          const createUserUsecase = new CreateUserUsecase(
            userRepository,
            tokenRepository
          )

          try {
            const result = await createUserUsecase.execute({
              email: credentials.email,
              password: credentials.password,
              nickName: credentials.nickname,
            })

            if (result.status === 201 && result.user && result.tokens) {
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
                accessToken: result.tokens.accessToken,
                refreshToken: result.tokens.refreshToken,
                accessTokenExpiry: result.tokens.accessTokenExpiry,
                refreshTokenExpiry: result.tokens.refreshTokenExpiry,
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
          const signInUsecase = new SignInUsecase(
            userRepository,
            tokenRepository
          )

          const result = await signInUsecase.execute({
            email: credentials.email,
            password: credentials.password,
          })

          if (result.status === 200 && result.user && result.tokens) {
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
              accessToken: result.tokens.accessToken,
              refreshToken: result.tokens.refreshToken,
              accessTokenExpiry: result.tokens.accessTokenExpiry,
              refreshTokenExpiry: result.tokens.refreshTokenExpiry,
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
    async jwt({ token, user }) {
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
        token.accessToken = user.accessToken
        token.refreshToken = user.refreshToken
        token.accessTokenExpiry = user.accessTokenExpiry
        token.refreshTokenExpiry = user.refreshTokenExpiry
        return token
      }

      if (token.accessTokenExpiry && Date.now() < token.accessTokenExpiry) {
        console.log("✅ 액세스 토큰이 아직 유효합니다")
        return token
      }

      if (token.refreshTokenExpiry && Date.now() < token.refreshTokenExpiry) {
        console.log("🔄 액세스 토큰 갱신 시도")
        try {
          const tokenRepository = new JwtTokenRepository()
          if (!token.refreshToken) {
            token.error = "RefreshTokenError"
            return token
          }
          const newTokens = await tokenRepository.refreshAccessToken(
            token.refreshToken
          )
          console.log("‼️newAccessToken생성되었습니다", newTokens)

          if (!newTokens) {
            token.error = "RefreshTokenError"
            return token
          }

          return {
            ...token,
            accessToken: newTokens.accessToken,
            refreshToken: newTokens.refreshToken,
            accessTokenExpiry: newTokens.accessTokenExpiry,
            refreshTokenExpiry: newTokens.refreshTokenExpiry,
            exp: Math.floor(newTokens.refreshTokenExpiry / 1000),
          }
        } catch (error) {
          console.error("Error refreshing access_token", error)
          token.error = "RefreshTokenError"
          return token
        }
      }
      console.log(
        "🚫 모든 토큰이 만료되었습니다.",
        token.refreshTokenExpiry,
        Date.now()
      )
      token.error = "RefreshTokenError"
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
        session.user.accessToken = token.accessToken
        session.user.refreshToken = token.refreshToken
        session.user.accessTokenExpiry = token.accessTokenExpiry
        session.user.refreshTokenExpiry = token.refreshTokenExpiry
      }
      return session
    },
  },
}
