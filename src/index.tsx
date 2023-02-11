import React from "react"
import { unstable_BlockerFunction as BlockerFunction } from "react-router-dom"

import useConfirm from "./hooks/use-confirm"

type ReactRouterPromptProps = {
  when: boolean | BlockerFunction
  children: (data: {
    isActive: boolean
    onCancel(): void
    onConfirm(): void
  }) => React.ReactNode
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

function ReactRouterPrompt({ when, children }: ReactRouterPromptProps) {
  const { isActive, onConfirm, resetConfirmation } = useConfirm(when)

  if (isActive) {
    return (
      <div>
        {children({
          isActive: true,
          onConfirm,
          onCancel: resetConfirmation,
        })}
      </div>
    )
  }
  return null
}

export default ReactRouterPrompt
