import { useState, useEffect, useCallback, useContext } from "react";
import { ConfirmContext } from "../ConfirmContext";
import { Transition } from "history";
import { useLocation } from "react-router-dom";
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

  const resetConfirmation = useCallback(() => {
    setConfirm(initialConfirmState);
  }, []);

  const onConfirm = async (tx: Transition): Promise<boolean> => {
    const promise = new Promise((resolve, reject) => {
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
        if (!when(location, tx.location, tx.action)) {
          resolve(null);
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
  };

  return {
    ...confirm,
    onConfirm,
    resetConfirmation,
  };
};

export default useConfirm;
