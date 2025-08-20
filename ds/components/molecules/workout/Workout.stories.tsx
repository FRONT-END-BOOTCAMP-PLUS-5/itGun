import type { Meta, StoryObj } from "@storybook/nextjs"
import { useState } from "react"
import Workout from "@/ds/components/molecules/workout/Workout"

const meta: Meta<typeof Workout> = {
  title: "Components/Molecules/Workout",
  component: Workout,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "secondary-purple", "secondary-pink", "secondary-blue", "secondary-yellow", "error", "accent", "success", "info", "disable"],
    },
    type: {
      control: { type: "select" },
      options: ["weight-reps", "reps", "distance-duration", "duration"],
    },
    isEditable: {
      control: { type: "boolean" },
    },
  },
}

export default meta
type Story = StoryObj<typeof Workout>

export const WeightRepsReadOnly: Story = {
  args: {
    variant: "primary",
    title: "벤치프레스",
    type: "weight-reps",
    seq: 1,
    isEditable: false,
    data: [
      { setCount: 1, weight: "80", repetitionCount: "10" },
      { setCount: 2, weight: "85", repetitionCount: "8" },
    ],
  },
}

// Interactive 스토리
export const InteractiveDistanceDuration = () => {
  const [type, setType] = useState<"weight-reps" | "reps" | "distance-duration" | "duration">("distance-duration")
  const [data, setData] = useState([
    { setCount: 1, distance: "5.2", durationSeconds: 1530 }, // 25분 30초
    { setCount: 2, distance: "", durationSeconds: 0 },
  ])

  const handleDataChange = (setIndex: number, field: string, value: string | number, seq?: number) => {
    setData(prev => prev.map((item, index) => 
      index === setIndex ? { ...item, [field]: value } : item
    ))
  }

  const handleAddSet = () => {
    const newSetCount = data.length + 1
    setData(prev => [...prev, { setCount: newSetCount, distance: "", durationSeconds: 0 }])
  }

  const handleRemoveSet = (setIndex: number) => {
    setData(prev => {
      const filtered = prev.filter((_, index) => index !== setIndex)
      return filtered.map((item, index) => ({
        ...item,
        setCount: index + 1
      }))
    })
  }

  const handleTypeChange = (newType: "weight-reps" | "reps" | "distance-duration" | "duration", seq?: number) => {
    setType(newType)

    const initialData = {
      setCount: 1,
      weight: "",
      repetitionCount: "",
      distance: "",
      durationSeconds: 0
    }
    setData([initialData])
  }

  return (
    <div style={{ padding: "20px" }}>
      <h3>Interactive Workout with Type Change</h3>
      <p>제목 옆 설정 버튼을 클릭해서 운동 타입을 변경해보세요!</p>
      <Workout
        variant="secondary"
        title="운동"
        type={type}
        seq={1}
        isEditable={true}
        data={data}
        onAddSet={handleAddSet}
        onRemoveSet={handleRemoveSet}
        onDataChange={handleDataChange}
        onTypeChange={handleTypeChange}
      />
      
      <details style={{ marginTop: "20px", padding: "10px", border: "1px solid #ccc" }}>
        <summary>현재 데이터 상태</summary>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </details>
    </div>
  )
}

export const InteractiveWeightReps = () => {
  const [data, setData] = useState([
    { setCount: 1, weight: "80", repetitionCount: "10" },
    { setCount: 2, weight: "", repetitionCount: "" },
  ])

  const handleDataChange = (setIndex: number, field: string, value: string | number, seq?: number) => {
    setData(prev => prev.map((item, index) => 
      index === setIndex ? { ...item, [field]: value } : item
    ))
  }

  const handleAddSet = () => {
    const newSetCount = data.length + 1
    setData(prev => [...prev, { setCount: newSetCount, weight: "", repetitionCount: "" }])
  }

  const handleRemoveSet = (setIndex: number) => {
    setData(prev => {
      const filtered = prev.filter((_, index) => index !== setIndex)
      // setCount를 재정렬
      return filtered.map((item, index) => ({
        ...item,
        setCount: index + 1
      }))
    })
  }

  return (
    <div style={{ padding: "20px" }}>
      <h3>Interactive Weight-Reps Workout</h3>
      <Workout
        variant="primary"
        title="벤치프레스"
        type="weight-reps"
        seq={1}
        isEditable={true}
        data={data}
        onAddSet={handleAddSet}
        onRemoveSet={handleRemoveSet}
        onDataChange={handleDataChange}
      />
      
      <details style={{ marginTop: "20px", padding: "10px", border: "1px solid #ccc" }}>
        <summary>현재 데이터 상태</summary>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </details>
    </div>
  )
}
