import { useState, useEffect, useCallback, useContext } from "react";
import { ConfirmContext } from "../ConfirmContext";
import { Transition } from "history";
import { ReactRouterPromptProps } from "..";

const noop = () => {
  /*No Operation*/
};

const initialConfirmState = {
  isActive: false,
  proceed: noop,
  cancel: noop,
};

declare interface InitialStateType {
  isActive: boolean;
  proceed: (value: unknown) => void;
  cancel: (value: unknown) => void;
}

declare interface ConfirmLeaveReturnType extends InitialStateType {
  onConfirm: (tx: Transition) => Promise<boolean>;
  resetConfirmation: () => void;
}

const useConfirm = (
  when: ReactRouterPromptProps["when"]
): ConfirmLeaveReturnType => {
  const [confirm, setConfirm] = useState<InitialStateType>(initialConfirmState);
  const { setResolve } = useContext(ConfirmContext) || {};

  useEffect(() => {
    if (confirm.isActive) {
      window.onbeforeunload = (): boolean => {
        return false;
      };
    }

    return (): void => {
      if (confirm.isActive) window.onbeforeunload = null;
    };
  }, [confirm]);

  const resetConfirmation = useCallback(() => {
    setConfirm(initialConfirmState);
  }, []);

  const onConfirm = useCallback(
    async (tx: Transition): Promise<boolean> => {
      const promise = new Promise(async (resolve, reject) => {
        setConfirm((prevState: InitialStateType) => ({
          ...prevState,
          isActive: true,
          proceed: resolve,
          cancel: reject,
        }));

        // Go ahead and resolve the promise when the `when` function
        // returns `false`, which means the prompt should not be displayed
        // and navigation should occur.
        if (typeof when === "function") {
          const shouldPrompt = await when(tx.location, tx.action);
          if (!shouldPrompt) {
            resolve(true);
          }
        }
      });

      return promise.then(
        () => {
          setResolve?.(true);
          setConfirm({ ...confirm, isActive: false });
          return true;
        },
        () => {
          setConfirm({ ...confirm, isActive: false });
          setResolve?.(false);
          return false;
        }
      );
    },
    [confirm, setResolve, when]
  );

  return {
    ...confirm,
    onConfirm,
    resetConfirmation,
  };
};

export default useConfirm;
