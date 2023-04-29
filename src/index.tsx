import React, { useCallback } from "react"
import { unstable_BlockerFunction as BlockerFunction } from "react-router-dom"

import useConfirm from "./hooks/use-confirm"

type ReactRouterPromptProps = {
  when: boolean | BlockerFunction
  children: (data: {
    isActive: boolean
    onCancel(): void
    onConfirm(): void
  }) => React.ReactNode
  beforeCancel?: () => Promise<unknown>
  beforeConfirm?: () => Promise<unknown>
}

/**
 * A replacement component for the react-router `Prompt`.
 * Allows for more flexible dialogs.
 *
 * @example
 * <ReactRouterPrompt when={isDirty}>
 *   {({isActive, onConfirm, onCancel}) => (
 *     <Modal show={isActive}>
 *       <div>
 *         <p>Do you really want to leave?</p>
 *         <button onClick={onCancel}>Cancel</button>
 *         <button onClick={onConfirm}>Ok</button>
 *       </div>
 *     </Modal>
 *   )}
 * </ReactRouterPrompt>
 */

function ReactRouterPrompt({
  when,
  children,
  beforeCancel,
  beforeConfirm,
}: ReactRouterPromptProps) {
  const { isActive, onConfirm, resetConfirmation } = useConfirm(when)

  const onConfirmAction = useCallback(async () => {
    if (beforeConfirm) await beforeConfirm()
    onConfirm()
  }, [beforeConfirm, onConfirm])

  const onResetAction = useCallback(async () => {
    if (beforeCancel) await beforeCancel()
    resetConfirmation()
  }, [beforeCancel, resetConfirmation])

  if (isActive) {
    return (
      <div>
        {children({
          isActive: true,
          onConfirm: onConfirmAction,
          onCancel: onResetAction,
        })}
      </div>
    )
  }
  return null
}

export default ReactRouterPrompt
