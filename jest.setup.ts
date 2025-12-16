import "cross-fetch/polyfill"
import "@testing-library/jest-dom"
import { server } from "@/test/mocks/server"

process.env.NEXT_PUBLIC_API_BASE_URL = "http://localhost/api"

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())
