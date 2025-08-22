export const dateToyymmdd = (date: string): string => {
  const parsedDate = new Date(date)
  const year = parsedDate.getFullYear().toString().slice(-2)
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0")
  const day = String(parsedDate.getDate()).padStart(2, "0")

  return `${year}${month}${day}`
}
