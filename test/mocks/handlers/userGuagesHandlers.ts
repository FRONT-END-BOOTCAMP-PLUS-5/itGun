import { http, HttpResponse } from "msw"
import {
  noRecentWorkoutMessage,
  noWorkoutRecordMessage,
  recentWorkoutMessage,
} from "../datas/userGaugesMessageDatas"

const GUAGES_URL = "http://localhost/api/user/gauges"

export const checkUserGuagesNoWorkoutMessage = () => {
  return http.post(GUAGES_URL, () => {
    return HttpResponse.json(noWorkoutRecordMessage, { status: 200 })
  })
}

export const checkUserGuagesRecentWorkoutMessage = () => {
  return http.post(GUAGES_URL, () => {
    return HttpResponse.json(recentWorkoutMessage, { status: 200 })
  })
}

export const checkUserGuagesNoRecentWorkoutMessage = () => {
  return http.post(GUAGES_URL, () => {
    return HttpResponse.json(noRecentWorkoutMessage, { status: 200 })
  })
}

export const userGuagesHandlers = [
  checkUserGuagesNoWorkoutMessage(),
  checkUserGuagesRecentWorkoutMessage(),
  checkUserGuagesNoRecentWorkoutMessage(),
]
