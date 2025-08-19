"useclient"

import { Children, FC, TouchEvent, useRef, useState, useEffect } from "react"
import { CarouselProps } from "./Carousel.types"
import { SWIPE_THRESHOLD, TRANSITION_DURATION } from "./Carousel.constants"

export const Carousel: FC<CarouselProps> = ({
  children,
  className,
  isIndicators = true,
  autoSlideDelay,
  ...props
}) => {
  const combinedClassName = `
    relative size-full flex flex-col
   ${className || ""}
  `.trim()

  const childrens = Children.toArray(children)

  const [currentIndex, setCurrentIndex] = useState(1)
  const [transitionSpeed, setTransitionSpeed] = useState(TRANSITION_DURATION)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState(0)

  const touchStartX = useRef(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const extendedChildren = [childrens.at(-1), ...childrens, childrens.at(0)]

  const indicatorIndex = (() => {
    if (currentIndex === 0) return childrens.length - 1
    if (currentIndex === extendedChildren.length - 1) return 0
    return currentIndex - 1
  })()

  const moveToSlide = (direction: "prev" | "next") => {
    setTransitionSpeed(TRANSITION_DURATION)
    setCurrentIndex((prev) => (direction === "prev" ? prev - 1 : prev + 1))

    const shouldJump =
      (direction === "prev" && currentIndex === 1) ||
      (direction === "next" && currentIndex === childrens.length)

    if (shouldJump) {
      const timeout = setTimeout(() => {
        setTransitionSpeed(0)
        setCurrentIndex(direction === "prev" ? childrens.length : 1)
      }, TRANSITION_DURATION)

      return () => clearTimeout(timeout)
    }
  }

  const getTransform = () => {
    const baseOffset = currentIndex * (100 / extendedChildren.length)
    const dragOffsetPercent = containerRef.current
      ? (dragOffset / containerRef.current.offsetWidth) *
        (100 / extendedChildren.length)
      : 0

    return `translateX(-${baseOffset - dragOffsetPercent}%)`
  }

  const handleTouchStart = (e: TouchEvent) => {
    setIsDragging(true)
    touchStartX.current = e.touches[0].clientX
    setDragOffset(0)
  }

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging || !containerRef.current) return

    const currentX = e.touches[0].clientX
    const diff = currentX - touchStartX.current
    setDragOffset(diff)
  }

  const handleTouchEnd = () => {
    if (!containerRef.current) return

    setIsDragging(false)

    const containerWidth = containerRef.current.offsetWidth
    const dragPercent = (dragOffset / containerWidth) * 100

    if (Math.abs(dragPercent) > SWIPE_THRESHOLD) {
      moveToSlide(dragPercent > 0 ? "prev" : "next")
    }

    setDragOffset(0)
  }

  const handleIndicatorClick = (index: number) => {
    setTransitionSpeed(TRANSITION_DURATION)
    setCurrentIndex(index + 1)
  }

  useEffect(() => {
    if (!autoSlideDelay) return

    const timer = setTimeout(() => {
      moveToSlide("next")
    }, autoSlideDelay)

    return () => clearTimeout(timer)
  }, [currentIndex, autoSlideDelay])

  return (
    <div className={combinedClassName} {...props}>
      <div
        ref={containerRef}
        className="select-none-all flex-1 cursor-grab touch-none overflow-hidden active:cursor-grabbing"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <ul
          className="flex h-full"
          style={{
            transform: getTransform(),
            width: `${extendedChildren.length * 100}%`,
            transition:
              isDragging || transitionSpeed === 0
                ? "none"
                : `transform ${transitionSpeed}ms ease`,
          }}
        >
          {extendedChildren.map((child, index) => (
            <li
              key={index}
              className="h-full flex-shrink-0"
              style={{
                width: `${100 / extendedChildren.length}%`,
              }}
            >
              {child}
            </li>
          ))}
        </ul>
      </div>

      {isIndicators && (
        <div className="mt-4 flex justify-center gap-2">
          {childrens.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleIndicatorClick(index)}
              className={`size-2 cursor-pointer rounded-full transition-colors duration-300 ${
                index === indicatorIndex ? "bg-secondary-purple" : "bg-disable"
              }`}
              aria-label={`슬라이드 ${index + 1}로 이동`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
