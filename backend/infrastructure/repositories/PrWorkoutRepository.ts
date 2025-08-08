import prisma from "@/utils/prisma"
import { Workout } from "@/backend/domain/entities/Workout"
import { WorkoutRepository } from "@/backend/domain/repositories/WorkoutRepository"

export class PrWorkoutRepository implements WorkoutRepository {
  async findAll(): Promise<Workout[]> {
    const workouts = await prisma.workout.findMany()
    return workouts.map(this.toDomain)
  }

  async findById(id: number): Promise<Workout | null> {
    const workout = await prisma.workout.findUnique({
      where: { id },
    })
    return workout ? this.toDomain(workout) : null
  }

  async save(workout: Workout): Promise<Workout> {
    const savedWorkout = await prisma.workout.create({
      data: {
        seq: workout.seq,
        exerciseName: workout.exerciseName,
        setCount: workout.setCount,
        weight: workout.weight,
        repetitionCount: workout.repetitionCount,
        distance: workout.distance,
        durationSeconds: workout.durationSeconds,
      },
    })
    return this.toDomain(savedWorkout)
  }

  async saveMany(workouts: Omit<Workout, "id">[]): Promise<Workout[]> {
    const savedWorkouts = await prisma.workout.createMany({
      data: workouts.map((workout) => ({
        seq: workout.seq,
        exerciseName: workout.exerciseName,
        setCount: workout.setCount,
        weight: workout.weight,
        repetitionCount: workout.repetitionCount,
        distance: workout.distance,
        durationSeconds: workout.durationSeconds,
      })),
    })

    const createdWorkouts = await prisma.workout.findMany({
      orderBy: { id: "desc" },
      take: savedWorkouts.count,
    })

    return createdWorkouts.map(this.toDomain).reverse()
  }

  async update(
    id: number,
    workoutData: Partial<Workout>
  ): Promise<Workout | null> {
    try {
      const updatedWorkout = await prisma.workout.update({
        where: { id },
        data: {
          ...(workoutData.seq !== undefined && { seq: workoutData.seq }),
          ...(workoutData.exerciseName && {
            exerciseName: workoutData.exerciseName,
          }),
          ...(workoutData.setCount !== undefined && {
            setCount: workoutData.setCount,
          }),
          ...(workoutData.weight !== undefined && {
            weight: workoutData.weight,
          }),
          ...(workoutData.repetitionCount !== undefined && {
            repetitionCount: workoutData.repetitionCount,
          }),
          ...(workoutData.distance !== undefined && {
            distance: workoutData.distance,
          }),
          ...(workoutData.durationSeconds !== undefined && {
            durationSeconds: workoutData.durationSeconds,
          }),
        },
      })
      return this.toDomain(updatedWorkout)
    } catch (error) {
      return null
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      await prisma.workout.delete({
        where: { id },
      })
      return true
    } catch (error) {
      return false
    }
  }

  async findByMultipleCriteria(
    criteriaList: Partial<Workout>[]
  ): Promise<Workout[]> {
    const whereConditions = criteriaList.map((criteria) => ({
      seq: criteria.seq,
      exerciseName: criteria.exerciseName,
      setCount: criteria.setCount,
      ...(criteria.weight !== undefined && { weight: criteria.weight }),
      ...(criteria.repetitionCount !== undefined && {
        repetitionCount: criteria.repetitionCount,
      }),
      ...(criteria.distance !== undefined && { distance: criteria.distance }),
      ...(criteria.durationSeconds !== undefined && {
        durationSeconds: criteria.durationSeconds,
      }),
    }))

    const workouts = await prisma.workout.findMany({
      where: {
        OR: whereConditions,
      },
    })

    return workouts as Workout[]
  }

  private toDomain(workout: any): Workout {
    return new Workout(
      workout.id,
      workout.seq,
      workout.exerciseName,
      workout.setCount,
      workout.weight,
      workout.repetitionCount,
      workout.distance,
      workout.durationSeconds
    )
  }
}
