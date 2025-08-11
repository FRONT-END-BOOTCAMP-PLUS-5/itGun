export interface UserRecord {
  id: number
  userId: string
  benchPressMax?: number
  squatMax?: number
  deadliftMax?: number
  runningMax?: number
  createdAt: Date
  updatedAt: Date
}
