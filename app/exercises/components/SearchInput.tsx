"use client"

import Icon from "@/ds/components/atoms/icon/Icon"
import { Input } from "@/ds/components/atoms/input/Input"
import { useLogsStore } from "@/hooks/useLogsStore"
import { useRouter, useSearchParams } from "next/navigation"
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react"

const SearchInput = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { mode } = useLogsStore()

  const q = searchParams.get("q") || ""
  const [searchValue, setSearchValue] = useState(q)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const updateSearchParams = (value: string) => {
    const currentParams = new URLSearchParams(searchParams)
    if (value) currentParams.set("q", value)
    else currentParams.delete("q")
    router.replace(`/${mode}?${currentParams.toString()}`)
  }

  const debouncedSearch = (value: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      updateSearchParams(value)
    }, 500)
  }

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchValue(value)
    debouncedSearch(value)
  }

  const handleClearSearch = () => {
    setSearchValue("")
    const currentParams = new URLSearchParams(searchParams)
    currentParams.delete("q")
    router.replace(`/${mode}?${currentParams.toString()}`)
  }

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault()
    updateSearchParams(searchValue)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <form onSubmit={handleFormSubmit} className="relative">
      <Input
        value={searchValue}
        onChange={handleSearchChange}
        placeholder="운동 이름을 검색해주세요."
        className="pr-7"
        isFullWidth
      />
      <div className="absolute top-0 right-0" onClick={handleClearSearch}>
        <Icon name="remove" size={24} />
      </div>
    </form>
  )
}

export default SearchInput
