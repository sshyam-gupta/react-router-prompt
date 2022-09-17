import React, { useState } from "react";
import { createRoot } from "react-dom/client";

import ReactRouterPrompt from "../../src";

import { ErrorBoundary } from "react-error-boundary";

import {
  Routes,
  Route,
  NavLink,
  BrowserRouter,
  useLocation,
} from "react-router-dom";

export default function App() {
  return (
    <div>
      <nav>
        <NavLink to="/">Home</NavLink>
        &nbsp;&nbsp;&nbsp;
        <NavLink to="/promptable">Prompt</NavLink>
      </nav>

      <Routes>
        <Route index element={<Home />} />
        <Route path="/promptable" element={<Form />} />
      </Routes>
    </div>
  );
}

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

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
  const location = useLocation();

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div>
        <h1>About</h1>
        <ReactRouterPrompt
          when={nextLocation => {
            return (
              input.length >= 1 && location.pathname !== nextLocation.pathname
            );
          }}
        >
          {({ isActive, onConfirm, onCancel }) =>
            isActive && (
              <div className="lightbox">
                <div className="container">
                  <p>Do you really want to leave?</p>
                  <button onClick={onCancel}>Cancel</button>
                  <button onClick={onConfirm}>Ok</button>
                </div>
              </div>
            )
          }
        </ReactRouterPrompt>

        <input
          onChange={e => setInput(e.target.value)}
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

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
