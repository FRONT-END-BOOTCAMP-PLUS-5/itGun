"use client"

import { useEffect } from "react"
import { useLogsStore } from "@/hooks/useLogsStore"

export default function LogsInit() {
  const { setInit } = useLogsStore()

  useEffect(() => {
    return () => {
      setInit()
    }
  }, [setInit])

  return null
}
