import prisma from "../../../utils/prisma";
import { LogWorkout } from "../../domain/entities/LogWorkout";
import { LogWorkoutRepository } from "../../domain/repositories/LogWorkoutRepository";

export class PrLogWorkoutRepository implements LogWorkoutRepository {

  async findAll(): Promise<LogWorkout[]> {
    const logWorkouts = await prisma.logWorkout.findMany();
    return logWorkouts.map(this.toDomain);
  }

  async findById(id: number): Promise<LogWorkout | null> {
    const logWorkout = await prisma.logWorkout.findUnique({
      where: { id }
    });
    return logWorkout ? this.toDomain(logWorkout) : null;
  }

  async save(logWorkout: LogWorkout): Promise<LogWorkout> {
    const savedLogWorkout = await prisma.logWorkout.create({
      data: {
        id: logWorkout.id,
        logId: logWorkout.logId,
        workoutId: logWorkout.workoutId
      }
    });
    return this.toDomain(savedLogWorkout);
  }

  async update(id: number, logWorkoutData: Partial<LogWorkout>): Promise<LogWorkout | null> {
    try {
      const updatedLogWorkout = await prisma.logWorkout.update({
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

  async delete(id: number): Promise<boolean> {
    try {
      await prisma.logWorkout.delete({
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