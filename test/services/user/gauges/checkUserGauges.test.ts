import { checkUserGauges } from "@/services/user/gauges/checkUserGauges"
import {
  noRecentWorkoutMessage,
  noWorkoutRecordMessage,
  recentWorkoutMessage,
} from "@/test/mocks/datas/userGaugesMessageDatas"
import {
  checkUserGaugesNoRecentWorkoutMessage,
  checkUserGaugesNoWorkoutMessage,
  checkUserGaugesRecentWorkoutMessage,
} from "@/test/mocks/handlers/userGaugesHandlers"
import { server } from "@/test/mocks/server"

describe("checkUserGauges API", () => {
  it("운동 기록이 없을 때 '운동기록이 없음' 메시지를 반환해야 한다", async () => {
    server.use(checkUserGaugesNoWorkoutMessage())
    const response = await checkUserGauges()
    expect(response.message).toBe(noWorkoutRecordMessage.message)
  })

  it("최근 운동 기록이 있을 때 '14일 이내 운동 기록 있음' 메시지를 반환해야 한다", async () => {
    server.use(checkUserGaugesRecentWorkoutMessage())
    const response = await checkUserGauges()
    expect(response.message).toBe(recentWorkoutMessage.message)
  })

  it("최근 운동 기록이 없을 때 '게이지가 감소되었습니다.' 메시지를 반환해야 한다", async () => {
    server.use(checkUserGaugesNoRecentWorkoutMessage())
    const response = await checkUserGauges()
    expect(response.message).toBe(noRecentWorkoutMessage.message)
  })
})
