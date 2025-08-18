import prisma from "@/utils/prisma"
import { Workout } from "@/backend/domain/entities/Workout"
import { WorkoutRepository } from "@/backend/domain/repositories/WorkoutRepository"
import { TransactionClient } from "@/backend/domain/common/TransactionClient"

export class PrWorkoutRepository implements WorkoutRepository {
  async findAll(tx?: TransactionClient): Promise<Workout[]> {
    const client = tx || prisma
    const workouts = await client.workout.findMany()
    return workouts.map(this.toDomain)
  }

  async findById(id: number, tx?: TransactionClient): Promise<Workout | null> {
    const client = tx || prisma
    const workout = await client.workout.findUnique({
      where: { id },
    })
    return workout ? this.toDomain(workout) : null
  }

  async save(workout: Workout, tx?: TransactionClient): Promise<Workout> {
    const client = tx || prisma
    const savedWorkout = await client.workout.create({
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

  async saveMany(workouts: Omit<Workout, "id">[], tx?: TransactionClient): Promise<Workout[]> {
    const client = tx || prisma
    
    if (tx) {
      const savedWorkouts: Workout[] = []
      for (const workout of workouts) {
        const savedWorkout = await client.workout.create({
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
        savedWorkouts.push(savedWorkout as Workout)
      }
      return savedWorkouts
    } else {
      const savedWorkouts = await prisma.$transaction(
        workouts.map((workout) =>
          prisma.workout.create({
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
        )
      )
      return savedWorkouts as Workout[]
    }
  }

  async update(
    id: number,
    workoutData: Partial<Workout>,
    tx?: TransactionClient
  ): Promise<Workout | null> {
    try {
      const client = tx || prisma
      const updatedWorkout = await client.workout.update({
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

  async delete(id: number, tx?: TransactionClient): Promise<boolean> {
    try {
      const client = tx || prisma
      await client.workout.delete({
        where: { id },
      })
      return true
    } catch (error) {
      return false
    }
  }

  async findByMultipleCriteria(
    criteriaList: Partial<Workout>[],
    tx?: TransactionClient
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

    const client = tx || prisma
    const workouts = await client.workout.findMany({
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
