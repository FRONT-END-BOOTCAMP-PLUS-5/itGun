import { B1, C1, D1 } from "@/ds/components/atoms/text/TextWrapper"

const NotFoundText = () => {
  return (
    <div className="absolute top-[160px] left-1/2 flex w-fit -translate-1/2 flex-col gap-2 text-center">
      <D1>404</D1>
      <C1 variant="secondary">
        이 페이지는
        <br /> 존재하지 않아요..
      </C1>
    </div>
  )
}

export default NotFoundText
