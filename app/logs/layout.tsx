import LogsHeader from "./components/LogsHeader"

export default function LogsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <LogsHeader />
      {children}
    </>
  )
}
