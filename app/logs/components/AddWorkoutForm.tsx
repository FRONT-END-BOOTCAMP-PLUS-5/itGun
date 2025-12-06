import { FormData } from "@/app/logs/types"
import Icon from "@/ds/components/atoms/icon/Icon"
import Workout from "@/ds/components/molecules/workout/Workout"
import { useDialogStore } from "@/hooks/useDialogStore"
import { useLogsStore } from "@/hooks/useLogsStore"
const AddWorkoutForm = () => {
  const { setMode, setOpen, setFormData, formData } = useLogsStore()
  const { showDialog } = useDialogStore()

  const handleAddSet = (index: number) => {
    const newFormData = [...formData]

    newFormData[index].data.push({
      setCount: newFormData[index].data.length + 1,
    })

    setFormData(newFormData)
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

  const handleRemoveExercise = (index: number) => {
    const exerciseName = formData[index].title
    showDialog({
      message: `${exerciseName}\n  운동 기록을\n 정말 삭제 하실건가요?`,
      variant: "error",
      buttons: [
        {
          text: "네",
          onClick: () => {
            const newData = [...formData]
            newData.splice(index, 1)
            setFormData(newData)
          },
        },
        { text: "아니요", onClick: () => {} },
      ],
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

    if (formData[index].data.length <= 1) {
      newData.splice(index, 1)

      setFormData(newData)
    } else {
      newData[index].data.splice(setIndex, 1)
      setFormData(newData)
    }
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
          onRemoveExercise={() => handleRemoveExercise(index)}
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
