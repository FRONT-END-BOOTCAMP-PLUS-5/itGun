import {
  dateToYmdSlash,
  dateToyymmdd,
  yymmddToDate,
} from "@/utils/transferDate"

test("yymmdd string 값을 Date object로 변환", () => {
  const yymmddString = "251206"
  const date = new Date(2025, 11, 6)
  expect(yymmddToDate(yymmddString)).toEqual(date)
})

test("Date object .toString 한 값을 yymmdd 형식의 string 값으로 변환", () => {
  const date = new Date(2025, 11, 6)
  const yymmddString = "251206"
  expect(dateToyymmdd(date.toString())).toEqual(yymmddString)
})

test("Date object .toString 한 값을 yyyy/mm/dd 형식의 string 값으로 변환", () => {
  const date = new Date(2025, 11, 6)
  const resultString = "2025/12/06"
  expect(dateToYmdSlash(date.toString())).toEqual(resultString)
})
