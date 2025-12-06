export const yymmddToDate = (yymmddString: string) => {
  const year = parseInt(yymmddString.substring(0, 2), 10) + 2000 // Assuming 20xx
  const month = parseInt(yymmddString.substring(2, 4), 10) - 1 // Month is 0-indexed
  const day = parseInt(yymmddString.substring(4, 6), 10)
  return new Date(year, month, day)
}

export const dateToyymmdd = (date: string): string => {
  const parsedDate = new Date(date)
  const year = parsedDate.getFullYear().toString().slice(-2)
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0")
  const day = String(parsedDate.getDate()).padStart(2, "0")

  return `${year}${month}${day}`
}

export const dateToYmdSlash = (date: string): string => {
  const parsedDate = new Date(date)
  const year = parsedDate.getFullYear()
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0")
  const day = String(parsedDate.getDate()).padStart(2, "0")
  return `${year}/${month}/${day}`
}
