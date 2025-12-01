import Workout from "@/ds/components/molecules/workout/Workout"
import {
  WorkoutSetData,
  WorkoutType,
} from "@/ds/components/molecules/workout/Workout.types"
import {
  WorkoutGroup,
  WorkoutItem,
  WorkoutListProps,
} from "@/app/user/logs/[id]/types"

const getWorkoutType = (workout: WorkoutItem): WorkoutType => {
  const hasWeight = workout.weight != null
  const hasReps = workout.repetitionCount != null
  const hasDistance = workout.distance != null
  const hasDuration = workout.durationSeconds != null

  if (hasWeight && hasReps && !hasDistance && !hasDuration) {
    return "weight-reps"
  }
  if (hasDistance && hasDuration && !hasWeight && !hasReps) {
    return "distance-duration"
  }
  if (hasReps && !hasWeight && !hasDistance && !hasDuration) {
    return "reps"
  }
  return "duration"
}

const groupWorkouts = (workouts: WorkoutItem[]): WorkoutGroup[] => {
  return workouts.reduce<WorkoutGroup[]>((acc, workout) => {
    const idx = workout.seq - 1
    if (!acc[idx]) {
      acc[idx] = {
        seq: workout.seq,
        exerciseName: workout.exerciseName,
        type: getWorkoutType(workout),
        items: [],
      }
    }

    const setData: WorkoutSetData = {
      setCount: workout.setCount,
      weight: workout.weight,
      repetitionCount: workout.repetitionCount,
      distance: workout.distance,
      durationSeconds: workout.durationSeconds,
    }

    acc[idx].items.push(setData)
    return acc
  }, [])
}

const WorkoutList = ({ workouts }: WorkoutListProps) => {
  const groupedWorkouts = groupWorkouts(workouts)

  return (
    <div className="flex flex-col gap-2.5">
      {groupedWorkouts.map((workout) => (
        <Workout
          key={workout.seq}
          title={workout.exerciseName}
          type={workout.type}
          data={workout.items}
          isEditable={false}
          width="xs"
        />
      ))}
    </div>
  )
}

export default WorkoutList
