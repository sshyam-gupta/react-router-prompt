import { useCallback, useEffect } from "react"
import {
  useBeforeUnload,
  unstable_useBlocker as useBlocker,
  unstable_Blocker as Blocker,
  unstable_BlockerFunction as BlockerFunction,
} from "react-router-dom"

// You can abstract `useBlocker` to use the browser's `window.confirm` dialog to
// determine whether or not the user should navigate within the current origin.
// `useBlocker` can also be used in conjunction with `useBeforeUnload` to
// prevent navigation away from the current origin.
//
// IMPORTANT: There are edge cases with this behavior in which React Router
// cannot reliably access the correct location in the history stack. In such
// cases the user may attempt to stay on the page but the app navigates anyway,
// or the app may stay on the correct page but the browser's history stack gets
// out of whack. You should test your own implementation thoroughly to make sure
// the tradeoffs are right for your users.
function usePrompt(when: boolean | BlockerFunction): Blocker {
  const _when = useMemo(() => typeof when === 'function'? when() : when, [when]);
  const blocker = useBlocker(_when)
  useEffect(() => {
    // Reset if when is updated to false
    if (blocker.state === "blocked" && !_when) {
      blocker.reset()
    }
  }, [blocker, _when])

  useBeforeUnload(
    useCallback(
      (event) => {
        if (_when) {
          event.preventDefault()
          // eslint-disable-next-line no-param-reassign
          event.returnValue = "Changes that you made may not be saved."
        }
      },
      [_when],
    ),
    { capture: true },
  )

  return blocker
}

export default usePrompt
