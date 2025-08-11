import prisma from "@/utils/prisma"
import { UserRecord } from "@/backend/domain/entities/UserRecord"
import { UserRecordRepository } from "@/backend/domain/repositories/UserRecordRepository"

export class PrUserRecordRepository implements UserRecordRepository {
  async findByUserId(userId: string): Promise<UserRecord | null> {
    const userRecord = await prisma.userRecord.findUnique({
      where: { userId },
    })

    if (!userRecord) {
      return null
    }

    return this.toDomain(userRecord)
  }

  async save(userRecord: UserRecord): Promise<UserRecord> {
    const savedUserRecord = await prisma.userRecord.create({
      data: {
        userId: userRecord.userId,
        benchPressMax: userRecord.benchPressMax,
        squatMax: userRecord.squatMax,
        deadliftMax: userRecord.deadliftMax,
        runningMax: userRecord.runningMax,
      },
    })
    return this.toDomain(savedUserRecord)
  }

  async update(
    id: number,
    userRecordData: Partial<UserRecord>
  ): Promise<UserRecord | null> {
    try {
      const updatedUserRecord = await prisma.userRecord.update({
        where: { id },
        data: {
          ...(userRecordData.benchPressMax !== undefined && {
            benchPressMax: userRecordData.benchPressMax,
          }),
          ...(userRecordData.squatMax !== undefined && {
            squatMax: userRecordData.squatMax,
          }),
          ...(userRecordData.deadliftMax !== undefined && {
            deadliftMax: userRecordData.deadliftMax,
          }),
          ...(userRecordData.runningMax !== undefined && {
            runningMax: userRecordData.runningMax,
          }),
        },
      })
      return this.toDomain(updatedUserRecord)
    } catch (error) {
      return null
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      await prisma.userRecord.delete({
        where: { id },
      })
      return true
    } catch (error) {
      return false
    }
  }

  private toDomain(userRecord: any): UserRecord {
    return {
      id: userRecord.id,
      userId: userRecord.userId,
      benchPressMax: userRecord.benchPressMax,
      squatMax: userRecord.squatMax,
      deadliftMax: userRecord.deadliftMax,
      runningMax: userRecord.runningMax,
      createdAt: userRecord.createdAt,
      updatedAt: userRecord.updatedAt,
    }
  }
}
