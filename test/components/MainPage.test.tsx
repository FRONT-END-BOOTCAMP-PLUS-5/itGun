import React, { ReactNode } from "react"
import { render, waitFor } from "@testing-library/react"
import MainPage from "@/app/components/MainPage"
import { server } from "@/test/mocks/server"
import {
  checkUserGuagesNoRecentWorkoutMessage,
  checkUserGuagesRecentWorkoutMessage,
  checkUserGuagesNoWorkoutMessage,
} from "@/test/mocks/handlers/userGuagesHandlers"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

// 자식 컴포넌트 Mocking
jest.mock("@/app/components/MainCharacter", () => ({
  __esModule: true,
  default: jest.fn(({ decorations = [] }) => (
    <div
      data-testid="mock-main-character"
      data-decorations={JSON.stringify(decorations)}
    />
  )),
}))
const MockMainCharacter = jest.requireMock(
  "@/app/components/MainCharacter"
).default

jest.mock("@/app/components/MainUserTitle", () => ({
  __esModule: true,
  default: () => <div />,
}))
jest.mock("@/app/components/BadgeRing", () => ({
  __esModule: true,
  default: () => <div />,
}))
jest.mock("@/app/components/MobileNavBar", () => ({
  __esModule: true,
  default: () => <div />,
}))

// 유틸리티 함수 Mocking
jest.mock("@/utils/character", () => ({
  ...jest.requireActual("@/utils/character"),
  createAssetsFromSvgs: jest.fn((svgs) => {
    if (svgs.tear) {
      return [{ id: "tear", svg: "<svg>tear</svg>", level: 0 }]
    }
    return []
  }),
}))

describe("MainPage 통합 테스트", () => {
  const createWrapper = () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    })
    const QueryProviderWrapper = ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
    QueryProviderWrapper.displayName = "QueryProviderWrapper"
    return QueryProviderWrapper
  }

  beforeEach(() => {
    MockMainCharacter.mockClear()
  })

  it("시스템을 처음 사용하는 경우 MainCaracter가 보인다.", async () => {
    server.use(checkUserGuagesNoWorkoutMessage())
    render(<MainPage />, { wrapper: createWrapper() })

    await waitFor(() => {
      expect(MockMainCharacter).toHaveBeenCalled()
      const lastCallArgs =
        MockMainCharacter.mock.calls[MockMainCharacter.mock.calls.length - 1]
      const props = lastCallArgs[0]
      expect(props.decorations).toEqual([])
    })
  })

  it("14일 이내 운동 기록이 있는 경우 MainCharacter가 보인다.", async () => {
    server.use(checkUserGuagesRecentWorkoutMessage())
    render(<MainPage />, { wrapper: createWrapper() })

    await waitFor(() => {
      expect(MockMainCharacter).toHaveBeenCalled()
      const lastCallArgs =
        MockMainCharacter.mock.calls[MockMainCharacter.mock.calls.length - 1]
      const props = lastCallArgs[0]
      expect(props.decorations).toEqual([])
    })
  })

  it("14일 이내 운동 기록이 없는 경우 MainCharacter가 '눈물'과 함께 보인다.", async () => {
    server.use(checkUserGuagesNoRecentWorkoutMessage())
    render(<MainPage />, { wrapper: createWrapper() })

    await waitFor(() => {
      expect(MockMainCharacter).toHaveBeenCalled()
      const lastCallArgs =
        MockMainCharacter.mock.calls[MockMainCharacter.mock.calls.length - 1]
      const props = lastCallArgs[0]
      expect(props.decorations).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: "tear",
          }),
        ])
      )
    })
  })
})
