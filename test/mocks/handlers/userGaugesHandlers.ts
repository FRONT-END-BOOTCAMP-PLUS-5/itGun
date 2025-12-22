import { http, HttpResponse } from "msw"
import {
  noRecentWorkoutMessage,
  noWorkoutRecordMessage,
  recentWorkoutMessage,
} from "../datas/userGaugesMessageDatas"

const GAUGES_URL = "http://localhost/api/user/gauges"

export const checkUserGaugesNoWorkoutMessage = () => {
  return http.post(GAUGES_URL, () => {
    return HttpResponse.json(noWorkoutRecordMessage, { status: 200 })
  })
}

export const checkUserGaugesRecentWorkoutMessage = () => {
  return http.post(GAUGES_URL, () => {
    return HttpResponse.json(recentWorkoutMessage, { status: 200 })
  })
}

export const checkUserGaugesNoRecentWorkoutMessage = () => {
  return http.post(GAUGES_URL, () => {
    return HttpResponse.json(noRecentWorkoutMessage, { status: 200 })
  })
}

export const userGaugesHandlers = [
  checkUserGaugesNoRecentWorkoutMessage(),
  checkUserGaugesNoWorkoutMessage(),
  checkUserGaugesRecentWorkoutMessage(),
]
