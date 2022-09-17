import React, { useCallback, useContext } from "react";
import { Action, Location, Transition } from "history";

import useBlocker from "./hooks/use-blocker";
import ConfirmContextProvider, { ConfirmContext } from "./ConfirmContext";
import useConfirm from "./hooks/use-confirm";

export type ReactRouterPromptProps = {
  when: boolean | ((nextLocation: Location, _action: Action) => boolean);
  children: (data: {
    isActive: boolean;
    onCancel: (value: unknown) => void;
    onConfirm: (value: unknown) => void;
  }) => React.ReactNode;
};

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

const ReactRouterPrompt: React.FC<ReactRouterPromptProps> = ({
  when,
  children,
}) => {
  const {
    onConfirm,
    resetConfirmation,
    isActive,
    proceed,
    cancel,
  } = useConfirm(when);
  const { resolve } = useContext(ConfirmContext) || {};

  const blocker = useCallback(
    async (tx: Transition) => {
      const result = await onConfirm(tx);
      if (result) {
        resetConfirmation();
        tx.retry();
      }
    },
    [resetConfirmation, onConfirm]
  );

  // TODO: Check fif effect is required to reset resolution if "when" is changed.

  useBlocker(blocker, when && !resolve);

  return (
    <div>
      {children({
        isActive,
        onConfirm: proceed,
        onCancel: cancel,
      })}
    </div>
  );
};

const Main: React.FC<ReactRouterPromptProps> = props => {
  return (
    <ConfirmContextProvider>
      <ReactRouterPrompt {...props} />
    </ConfirmContextProvider>
  );
};

export default Main;
