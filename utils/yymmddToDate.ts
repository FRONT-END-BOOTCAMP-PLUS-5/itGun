export const yymmddToDate = (yymmddString: string) => {
  const year = parseInt(yymmddString.substring(0, 2), 10) + 2000 // Assuming 20xx
  const month = parseInt(yymmddString.substring(2, 4), 10) - 1 // Month is 0-indexed
  const day = parseInt(yymmddString.substring(4, 6), 10)
  return new Date(year, month, day)
}
