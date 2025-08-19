import prisma from "../../../utils/prisma";
import { LogWorkout } from "../../domain/entities/LogWorkout";
import { LogWorkoutRepository } from "../../domain/repositories/LogWorkoutRepository";
import { TransactionClient } from "@/backend/domain/common/TransactionClient";

export class PrLogWorkoutRepository implements LogWorkoutRepository {

  async findAll(tx?: TransactionClient): Promise<LogWorkout[]> {
    const client = tx || prisma
    const logWorkouts = await client.logWorkout.findMany();
    return logWorkouts.map(this.toDomain);
  }

  async findById(id: number, tx?: TransactionClient): Promise<LogWorkout | null> {
    const client = tx || prisma
    const logWorkout = await client.logWorkout.findUnique({
      where: { id }
    });
    return logWorkout ? this.toDomain(logWorkout) : null;
  }

  async save(logWorkout: LogWorkout, tx?: TransactionClient): Promise<LogWorkout> {
    const client = tx || prisma
    const savedLogWorkout = await client.logWorkout.create({
      data: {
        logId: logWorkout.logId,
        workoutId: logWorkout.workoutId,
      },
    })
    return this.toDomain(savedLogWorkout)
  }

  async saveMany(logWorkouts: Omit<LogWorkout, "id">[], tx?: TransactionClient): Promise<{ count: number }> {
    const client = tx || prisma
    const savedLogWorkouts = await client.logWorkout.createMany({
      data: logWorkouts.map((logWorkout) => ({
        logId: logWorkout.logId,
        workoutId: logWorkout.workoutId,
        createdAt: logWorkout.createdAt || new Date(),
      })),
    })

    return { count: savedLogWorkouts.count }
  }

  async update(id: number, logWorkoutData: Partial<LogWorkout>, tx?: TransactionClient): Promise<LogWorkout | null> {
    try {
      const client = tx || prisma
      const updatedLogWorkout = await client.logWorkout.update({
        where: { id },
        data: {
          ...(logWorkoutData.logId !== undefined && { logId: logWorkoutData.logId }),
          ...(logWorkoutData.workoutId !== undefined && { workoutId: logWorkoutData.workoutId })
        }
      });
      return this.toDomain(updatedLogWorkout);
    } catch (error) {
      return null;
    }
  }

  async delete(id: number, tx?: TransactionClient): Promise<boolean> {
    try {
      const client = tx || prisma
      await client.logWorkout.delete({
        where: { id }
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  private toDomain(logWorkout: any): LogWorkout {
    return new LogWorkout(
      logWorkout.id,
      logWorkout.logId,
      logWorkout.workoutId
    );
  }
}