import { BlockerFunction } from "react-router-dom"
import usePrompt from "./use-prompt"

declare interface InitialStateType {
  isActive: boolean
  onConfirm(): void
  resetConfirmation(): void
}

const useConfirm = (when: boolean | BlockerFunction): InitialStateType => {
  const blocker = usePrompt(when)

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
  }
}

export default useConfirm
