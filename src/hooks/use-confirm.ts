import { useState, useEffect, useCallback, useContext } from "react";
import { ConfirmContext } from "../ConfirmContext";

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
  onConfirm: () => Promise<boolean>;
  resetConfirmation: () => void;
}

const useConfirm = (): ConfirmLeaveReturnType => {
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

  const onConfirm = async (): Promise<boolean> => {
    const promise = new Promise((resolve, reject) => {
      setConfirm((prevState: InitialStateType) => ({
        ...prevState,
        isActive: true,
        proceed: resolve,
        cancel: reject,
      }));
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
