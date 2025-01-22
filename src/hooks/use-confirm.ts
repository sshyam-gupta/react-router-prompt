import { BlockerFunction, Location } from "react-router-dom"
import usePrompt from "./use-prompt"
import { useState } from "react"

declare interface InitialStateType {
  isActive: boolean
  onConfirm(): void
  resetConfirmation(): void
  nextLocation?: Location
}

const useConfirm = (when: boolean | BlockerFunction): InitialStateType => {
  const [nextLocation, setNextLocation] = useState<Location | null>(null)

  const blocker = usePrompt(when, (location) => {
    setNextLocation(location)
  })

  const resetConfirmation = () => {
    if (blocker.state === "blocked") blocker.reset()
  }

  const onConfirm = () => {
    if (blocker.state === "blocked") setTimeout(blocker.proceed, 0)
  }

  return {
    isActive: blocker.state === "blocked",
    onConfirm,
    resetConfirmation,
    nextLocation: nextLocation || undefined,
  }
}

export default useConfirm
