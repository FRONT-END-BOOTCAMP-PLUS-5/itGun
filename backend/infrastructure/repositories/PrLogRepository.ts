import prisma from "@/utils/prisma"
import { Log, CalIconType } from "@/backend/domain/entities/Log"
import { LogRepository } from "@/backend/domain/repositories/LogRepository"

export class PrLogRepository implements LogRepository {
  async findAll(): Promise<Log[]> {
    const logs = await prisma.log.findMany()
    return logs.map(this.toDomain)
  }

  async findAllByUserIdAndDateRange(
    userId: string,
    startDate: Date,
    endDate: Date,
    includeWorkouts: boolean = false
  ): Promise<Log[]> {
    const logs = await prisma.log.findMany({
      where: {
        userId,
        createdAt: {
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
        createdAt: "desc",
      },
    })

    return logs as Log[]
  }

  async findFirstByUserId(userId: string): Promise<Log | null> {
    const log = await prisma.log.findFirst({
      where: { userId },
      orderBy: {
        createdAt: "asc",
      },
    })

    return log as Log || null
  }

  async findById(id: number): Promise<Log | null> {
    const log = await prisma.log.findUnique({
      where: { id },
      include: {
        logWorkouts: {
          include: {
            workout: true,
          },
        },
      },
    })

    return log as Log || null
  }

  async save(log: Log): Promise<Log> {
    const savedLog = await prisma.log.create({
      data: {
        userId: log.userId,
        calIconType: log.calIconType,
        totalDuration: log.totalDuration,
        gaugeChanges: log.gaugeChanges,
        createdAt: log.createdAt,
      },
    })
    return this.toDomain(savedLog)
  }

  async update(id: number, logData: Partial<Log>): Promise<Log | null> {
    try {
      const updatedLog = await prisma.log.update({
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

  async delete(id: number): Promise<boolean> {
    try {
      await prisma.log.delete({
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
      log.createdAt,
      log.logWorkouts,
      log.gaugeChanges
    )
  }
}
