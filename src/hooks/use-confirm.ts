import { Transition } from "history";
import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { ReactRouterPromptProps } from "..";

const noop = () => {
  /*No Operation*/
};

const initialConfirmState = {
  isActive: false,
  hasConfirmed: false,
  proceed: noop,
  cancel: noop,
};

declare interface InitialStateType {
  isActive: boolean;
  hasConfirmed: boolean;
  proceed: () => void;
  cancel: () => void;
}

declare interface ConfirmLeaveReturnType extends InitialStateType {
  onConfirm: (tx: Transition) => Promise<boolean | "noReset">;
  resetConfirmation: () => void;
}

const useConfirm = (
  when: ReactRouterPromptProps["when"]
): ConfirmLeaveReturnType => {
  const [confirm, setConfirm] = useState<InitialStateType>(initialConfirmState);

  // Create a location object that includes the router's `basename` in
  // the pathname since the blocker location object includes `basename`.
  const { hash, key, search, state } = useLocation();
  const { pathname } = window.location;
  const location = { hash, key, pathname, search, state };

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

  const onConfirm = useCallback(
    (tx: Transition) => {
      const promise = new Promise<"noReset" | true>((resolve, reject) => {
        setConfirm((prevState: InitialStateType) => ({
          ...prevState,
          isActive: true,
          proceed: () => resolve(true),
          cancel: () => reject(),
        }));

        // Go ahead and resolve the promise when the `when` function
        // returns `false`, which means the prompt should not be displayed
        // and navigation should occur.
        if (typeof when === "function") {
          if (!when(location, tx.location, tx.action)) {
            // Use "noReset" to ensure that `resetConfirmation()` is not executed,
            // which would cause an infinite loop when attempting to navigate
            // with the forward and back buttons in the browser.
            resolve("noReset");
          }
        }
      });

      return promise.then(
        result => {
          setConfirm({ ...confirm, isActive: false, hasConfirmed: true });
          return result;
        },
        () => {
          setConfirm({ ...confirm, isActive: false });
          return false;
        }
      );
    },
    [confirm, location, when]
  );

  const resetConfirmation = useCallback(() => {
    setConfirm(initialConfirmState);
  }, []);

  return {
    ...confirm,
    onConfirm,
    resetConfirmation,
  };
};

export default useConfirm;
