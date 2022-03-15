import { useState, useEffect, useCallback } from "react";

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
  proceed: (value: unknown) => void;
  cancel: (value: unknown) => void;
}

declare interface ConfirmLeaveReturnType extends InitialStateType {
  onConfirm: () => Promise<boolean>;
  resetConfirmation: () => void;
}

const useConfirm = (): ConfirmLeaveReturnType => {
  const [confirm, setConfirm] = useState<InitialStateType>(initialConfirmState);

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

  const onConfirm = useCallback(() => {
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
        setConfirm({ ...confirm, isActive: false, hasConfirmed: true });
        return true;
      },
      () => {
        setConfirm({ ...confirm, isActive: false });
        return false;
      }
    );
  }, []);

  const resetConfirmation = useCallback(() => {
    () => setConfirm(initialConfirmState);
  }, []);

  return {
    ...confirm,
    onConfirm,
    resetConfirmation,
  };
};

export default useConfirm;
