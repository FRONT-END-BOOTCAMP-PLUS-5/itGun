import prisma from "@/utils/prisma"
import { Log, CalIconType } from "@/backend/domain/entities/Log"
import { LogRepository } from "@/backend/domain/repositories/LogRepository"
import { TransactionClient } from "@/backend/domain/common/TransactionClient"
import { Workout } from "@/backend/domain/entities/Workout"
import { create } from "domain"

export class PrLogRepository implements LogRepository {
  async findAll(tx?: TransactionClient): Promise<Log[]> {
    const client = tx || prisma
    const logs = await client.log.findMany()
    return logs.map(this.toDomain)
  }

  async findAllByUserIdAndDateRange(
    userId: string,
    startDate: Date,
    endDate: Date,
    includeWorkouts: boolean = false,
    tx?: TransactionClient
  ): Promise<Log[]> {
    const client = tx || prisma
    const logs = await client.log.findMany({
      where: {
        userId,
        logDate: {
          gte: startDate,
          lte: endDate,
        },
      },
      ...(includeWorkouts && {
        include: {
          logWorkouts: {
            include: {
              workout: true,
            },
          },
        },
      }),
      orderBy: {
        logDate: "desc",
      },
    })

    return logs as Log[]
  }

  async findFirstByUserId(userId: string, tx?: TransactionClient): Promise<Log | null> {
    const client = tx || prisma
    const log = await client.log.findFirst({
      where: { userId },
      orderBy: {
        logDate: "asc",
      },
    })

    return log as Log || null
  }

  async findById(id: number, includeWorkouts: boolean = false, tx?: TransactionClient): Promise<Log | null> {
    const client = tx || prisma
    const log = await client.log.findUnique({
      where: { id },
      ...(includeWorkouts && {
        include: {
          logWorkouts: {
            include: {
              workout: true,
            },
          },
        },
      }),
    })

    return log as Log || null
  }

  async saveWithRelations(log: Log, workoutToCreate: Workout[], workoutToConnect: Pick<Workout, "id">[], tx?: TransactionClient): Promise<Log> {
    const client = tx || prisma
    const savedLog = await client.log.create({
      data: {
        userId: log.userId,
        calIconType: log.calIconType,
        totalDuration: log.totalDuration,
        gaugeChanges: log.gaugeChanges,
        logDate: log.logDate,
        createdAt: log.createdAt,

        logWorkouts: {
          create: [
            ...workoutToCreate.map(workout => ({
              workout: {
                create: {
                  seq: workout.seq,
                  exerciseName: workout.exerciseName,
                  setCount: workout.setCount,
                  weight: workout.weight,
                  repetitionCount: workout.repetitionCount,
                  distance: workout.distance,
                  durationSeconds: workout.durationSeconds
                }
              },
              createdAt: log.createdAt
            })),
            ...workoutToConnect.map(workout => ({
              workout: {
                connect: { id: workout.id }
              }
            }))
          ],
        }
      }
    })

    return savedLog as Log
  }

  async save(log: Log, tx?: TransactionClient): Promise<Log> {
    const client = tx || prisma
    const savedLog = await client.log.create({
      data: {
        userId: log.userId,
        calIconType: log.calIconType,
        totalDuration: log.totalDuration,
        gaugeChanges: log.gaugeChanges,
        logDate: log.logDate,
      },
    })
    return savedLog as Log
  }

  async update(id: number, logData: Partial<Log>, tx?: TransactionClient): Promise<Log | null> {
    try {
      const client = tx || prisma
      const updatedLog = await client.log.update({
        where: { id },
        data: {
          ...(logData.userId && { userId: logData.userId }),
          ...(logData.calIconType && { calIconType: logData.calIconType }),
          ...(logData.totalDuration !== undefined && {
            totalDuration: logData.totalDuration,
          }),
          ...(logData.gaugeChanges !== undefined && {
            gaugeChanges: logData.gaugeChanges,
          }),
        },
      })
      return this.toDomain(updatedLog)
    } catch (error) {
      return null
    }
  }

  async delete(id: number, tx?: TransactionClient): Promise<boolean> {
    try {
      const client = tx || prisma
      await client.log.delete({
        where: { id },
      })
      return true
    } catch (error) {
      return false
    }
  }

  private toDomain(log: any): Log {
    return new Log(
      log.id,
      log.userId,
      log.calIconType as CalIconType,
      log.totalDuration,
      log.logDate,
      log.createdAt,
      log.logWorkouts,
      log.gaugeChanges
    )
  }
}
