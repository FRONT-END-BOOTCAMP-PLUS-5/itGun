import LogsInit from "./components/LogsInit"

export default function LogsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <LogsInit />
      {children}
    </>
  )
}
