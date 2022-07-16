import { useContext, useEffect } from "react";
import { Blocker, Transition } from "history";
// @ts-ignore
import { UNSAFE_NavigationContext as NavigationContext } from "react-router-dom";

function useBlocker(blocker: Blocker, when = true) {
  const { navigator } = useContext(NavigationContext);

  useEffect(() => {
    if (!when) return;

    // @ts-ignore
    const unblock = navigator.block((tx: Transition) => {
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
  }, [navigator, blocker, when]);
}

export default useBlocker;
