const RAW_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "/api"

function normalizeBaseUrl(raw: string): string {
  const trimmed = raw.trim()
  // 잘못된 접두사 보정 (예: 'tp://...' → 'http://...')
  const fixedProtocol = trimmed.startsWith("tp://") ? `ht${trimmed}` : trimmed
  // 상대 경로 또는 절대 경로 모두 끝 슬래시 제거
  const withoutTrailingSlash = fixedProtocol.replace(/\/+$/, "")
  return withoutTrailingSlash
}

function normalizeEndpoint(endpoint: string): string {
  return endpoint.startsWith("/") ? endpoint : `/${endpoint}`
}

const API_BASE_URL = normalizeBaseUrl(RAW_API_BASE_URL)

class ApiClient {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${normalizeEndpoint(endpoint)}`

    if (process.env.NODE_ENV !== "production") {
      // 디버그: 요청 정보 로깅
      // eslint-disable-next-line no-console
      console.debug(
        `[api] request url=${url} method=${options.method || "GET"}`
      )
    }

    let response: Response
    try {
      response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      })
    } catch (err: any) {
      if (process.env.NODE_ENV !== "production") {
        const name = err?.name || "Error"
        const message = err?.message || String(err)
        // eslint-disable-next-line no-console
        console.error(
          `[api] fetch failed url=${url} name=${name} message=${message}`
        )
      }
      throw err
    }

    if (!response.ok) {
      let message = `HTTP ${response.status}`
      let errorData: any = null

      try {
        errorData = await response.json()
        message = errorData?.error || errorData?.message || message
      } catch {
        // ignore body parse error
      }

      if (process.env.NODE_ENV !== "production") {
        // eslint-disable-next-line no-console
      }

      throw new Error(message)
    }

    try {
      return (await response.json()) as T
    } catch (e) {
      // JSON이 아닌 응답인 경우
      throw new Error("Invalid JSON response")
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "GET" })
  }

  async post<T>(endpoint: string, body?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
    })
  }

  async put<T>(endpoint: string, body?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(body),
    })
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "DELETE" })
  }
}

export const api = new ApiClient()
