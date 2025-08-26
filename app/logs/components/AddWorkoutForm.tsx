import Icon from "@/ds/components/atoms/icon/Icon"
import Workout from "@/ds/components/molecules/workout/Workout"
import { useLogsStore } from "@/hooks/useLogsStore"
import { Exercise } from "@/services/exercises/getExercises"
import { useEffect } from "react"
import { FormData, workoutTypes } from "../types"
import { AddWorkoutFormProps } from "./type"

const AddWorkoutForm = ({
  formData,
  setFormData,
  workoutData,
  setWorkoutData,
}: AddWorkoutFormProps) => {
  const { exerciseData, setMode, setOpen, setInit } = useLogsStore()

  const handleAddSet = (index: number) => {
    const newFormData = [...formData]
    const newWorkoutData = [...workoutData]

    newFormData[index].data.push({
      setCount: newFormData[index].data.length + 1,
    })

    const currentSeq = newWorkoutData[index].seq
    const newSet = {
      ...newWorkoutData[index],
      seq: currentSeq,
      setCount: newWorkoutData[index].setCount + 1,
    }

    newWorkoutData.push(newSet)
    setFormData(newFormData)
    setWorkoutData(newWorkoutData)
  }

  const handleDataChange = ({
    index,
    setIndex,
    field,
    value,
  }: {
    index: number
    setIndex: number
    field: string
    value: string | number
  }) => {
    setFormData((prev) => {
      const newData = [...prev]
      newData[index].data[setIndex] = {
        ...newData[index].data[setIndex],
        [field]: value,
      }
      return newData
    })
    setWorkoutData((prev) => {
      const newWorkoutData = [...prev]
      const targetWorkout = newWorkoutData.find(
        (workout) =>
          workout.seq === index + 1 && workout.setCount === setIndex + 1
      )

      if (targetWorkout) {
        Object.assign(targetWorkout, {
          [field]: typeof value === "string" ? Number(value) : value,
        })
      }

      return newWorkoutData
    })
  }

  const handleRemoveSet = ({
    index,
    setIndex,
  }: {
    index: number
    setIndex: number
  }) => {
    const newData = [...formData]
    const newWorkoutData = [...workoutData]

    if (formData[index].data.length <= 1) {
      newData.splice(index, 1)

      const currentSeq = index + 1
      const workoutsToRemove = newWorkoutData.filter(
        (workout) => workout.seq === currentSeq
      )

      workoutsToRemove.forEach((workout) => {
        const index = newWorkoutData.findIndex((w) => w === workout)
        if (index !== -1) newWorkoutData.splice(index, 1)
      })

      newData.forEach((item, idx) => {
        item.id = idx + 1
      })

      newWorkoutData.forEach((workout, idx) => {
        workout.seq = idx + 1
      })
    } else {
      newData[index].data.splice(setIndex, 1)

      const currentSeq = newWorkoutData[index].seq
      const targetSetCount = setIndex + 1

      const targetIndex = newWorkoutData.findIndex(
        (workout) =>
          workout.seq === currentSeq && workout.setCount === targetSetCount
      )

      if (targetIndex !== -1) {
        newWorkoutData.splice(targetIndex, 1)
      }
    }

    setFormData(newData)
    setWorkoutData(newWorkoutData)
  }

  const handleTypeChange = (index: number, newType: string) => {
    setFormData((prev) => {
      const newData = [...prev]
      newData[index].type = newType as FormData["type"]
      newData[index].data = [{ setCount: 1 }]
      return newData
    })
  }

  const handleAddLog = () => {
    setMode("logs")
    setOpen(true)
  }

  useEffect(
    function storeExerciseData() {
      if (Object.keys(exerciseData).length > 0) {
        setFormData((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            title: (exerciseData as Exercise).name,
            type: workoutTypes[
              (exerciseData as Exercise).exerciseType
            ] as FormData["type"],
            data: [{ setCount: 1 }],
          },
        ])
        setWorkoutData((prev) => [
          ...prev,
          {
            seq: prev.length > 0 ? Math.max(...prev.map((w) => w.seq)) + 1 : 1,
            exerciseName: (exerciseData as Exercise).name,
            setCount: 1,
            exerciseInfo: {
              exerciseId: (exerciseData as Exercise).exerciseId,
              name: (exerciseData as Exercise).name,
              imageUrl: (exerciseData as Exercise).imageUrl,
              videoUrl: (exerciseData as Exercise).videoUrl,
              bodyParts: (exerciseData as Exercise).bodyParts,
              equipments: (exerciseData as Exercise).equipments,
              exerciseType: (exerciseData as Exercise).exerciseType,
              instructions: (exerciseData as Exercise).instructions,
              exerciseTips: (exerciseData as Exercise).exerciseTips,
            },
          },
        ])
        setInit()
      }
    },
    [exerciseData]
  )

  return (
    <section className="flex flex-col items-center justify-center gap-7">
      {formData?.map((item, index) => (
        <Workout
          key={index}
          title={item.title}
          type={item.type}
          data={item.data}
          onAddSet={() => handleAddSet(index)}
          onDataChange={(setIndex, field, value) =>
            handleDataChange({ index, setIndex, field, value })
          }
          onRemoveSet={(setIndex) => handleRemoveSet({ index, setIndex })}
          isEditable={true}
          isFullWidth
          onTypeChange={(newType) => handleTypeChange(index, newType)}
        />
      ))}
      <button onClick={handleAddLog}>
        <Icon name="plus" size={40} />
      </button>
    </section>
  )
}

export default AddWorkoutForm
