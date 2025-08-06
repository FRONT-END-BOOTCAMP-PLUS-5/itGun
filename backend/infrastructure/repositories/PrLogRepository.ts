import prisma from "../../../utils/prisma";
import { Log, CalIconType } from "../../domain/entities/Log";
import { LogRepository } from "../../domain/repositories/LogRepository";

export class PrLogRepository implements LogRepository {

  async findAll(): Promise<Log[]> {
    const logs = await prisma.log.findMany();
    return logs.map(this.toDomain);
  }

  async findById(id: number): Promise<Log | null> {
    const log = await prisma.log.findUnique({
      where: { id }
    });
    return log ? this.toDomain(log) : null;
  }

  async save(log: Log): Promise<Log> {
    const savedLog = await prisma.log.create({
      data: {
        id: log.id,
        userId: log.userId,
        calIconType: log.calIconType,
        totalDuration: log.totalDuration,
        createdAt: log.createdAt
      }
    });
    return this.toDomain(savedLog);
  }

  async update(id: number, logData: Partial<Log>): Promise<Log | null> {
    try {
      const updatedLog = await prisma.log.update({
        where: { id },
        data: {
          ...(logData.userId && { userId: logData.userId }),
          ...(logData.calIconType && { calIconType: logData.calIconType }),
          ...(logData.totalDuration !== undefined && { totalDuration: logData.totalDuration })
        }
      });
      return this.toDomain(updatedLog);
    } catch (error) {
      return null;
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      await prisma.log.delete({
        where: { id }
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  private toDomain(log: any): Log {
    return new Log(
      log.id,
      log.userId,
      log.calIconType as CalIconType,
      log.totalDuration,
      log.createdAt
    );
  }
}