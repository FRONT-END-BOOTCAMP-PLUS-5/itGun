import LogsInit from "./components/LogsInit"
import LogsHeader from "./components/LogsHeader"

export default function LogsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <LogsHeader />
      <LogsInit />
      {children}
    </>
  )
}
