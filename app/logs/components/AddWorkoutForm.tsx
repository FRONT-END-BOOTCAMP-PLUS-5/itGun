import { Exercise } from "@/services/exercises/getExercises"
import { Dispatch, SetStateAction, useEffect } from "react"
import { WorkoutItem, workoutTypes } from "./types"
import Workout from "@/ds/components/molecules/workout/Workout"
import Icon from "@/ds/components/atoms/icon/Icon"
import { useLogsStore } from "@/hooks/useLogsStore"

interface AddWorkoutFormProps {
  formData: WorkoutItem[]
  setFormData: Dispatch<SetStateAction<WorkoutItem[]>>
}
const AddWorkoutForm = ({ formData, setFormData }: AddWorkoutFormProps) => {
  const { exerciseData, setMode, setOpen } = useLogsStore()

  const handleAddSet = (index: number) => {
    const newData = [...formData]
    newData[index].data.push({ setCount: newData[index].data.length + 1 })
    setFormData(newData)
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
  }

  const handleRemoveSet = ({
    index,
    setIndex,
  }: {
    index: number
    setIndex: number
  }) => {
    const newData = [...formData]
    newData[index].data.splice(setIndex, 1)
    setFormData(newData)
  }
  console.log(formData)
  const handleAddLog = () => {
    setMode("logs")
    setOpen(true)
  }

  useEffect(() => {
    if (Object.keys(exerciseData).length > 0) {
      setFormData((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          title: (exerciseData as Exercise).name,
          type: workoutTypes[
            (exerciseData as Exercise).exerciseType
          ] as WorkoutItem["type"],
          data: [{ setCount: 1 }],
        },
      ])
    }
  }, [exerciseData])
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
        />
      ))}
      <button onClick={handleAddLog}>
        <Icon name="plus" size={40} />
      </button>
    </section>
  )
}

export default AddWorkoutForm
