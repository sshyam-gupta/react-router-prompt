import { useEffect } from "react";
import { Blocker, Transition } from "history";
import history from "history/browser";

function useBlocker(blocker: Blocker, when = true) {
  useEffect(() => {
    if (!when) return;

    // @ts-ignore
    const unblock = history.block((tx: Transition) => {
      const autoUnblockingTx = {
        ...tx,
        retry() {
          // Automatically unblock the transition so it can play all the way
          // through before retrying it. TODO: Figure out how to re-enable
          // this block if the transition is cancelled for some reason.
          unblock();
          tx.retry();
        },
      };

      blocker(autoUnblockingTx);
    });

    return unblock;
  }, [blocker, when]);
}

export default useBlocker;
