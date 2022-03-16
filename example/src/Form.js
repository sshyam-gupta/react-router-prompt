import { useState } from "react";

import ReactRouterPrompt from "react-router-prompt";
import { ErrorBoundary } from "react-error-boundary";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

const Form = () => {
  const [input, setInput] = useState("");

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div>
        <h1>About</h1>
        <ReactRouterPrompt when={input.length >= 1}>
          {({ isActive, onConfirm, onCancel }) =>
            isActive && (
              <div>
                <p>Do you really want to leave?</p>
                <button onClick={onCancel}>Cancel</button>
                <button onClick={onConfirm}>Ok</button>
              </div>
            )
          }
        </ReactRouterPrompt>

        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          placeholder="Enter something"
        />

        <p>
          Typing more than 1 character in the input cause the prompt to show on
          navigation
        </p>
      </div>
    </ErrorBoundary>
  );
};

export default Form;
