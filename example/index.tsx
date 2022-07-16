import 'react-app-polyfill/ie11';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import ReactRouterPrompt from '../.';
import { ErrorBoundary } from 'react-error-boundary';

import { Routes, Route, NavLink, BrowserRouter } from 'react-router-dom';

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

function ErrorFallback({ error, resetErrorBoundary }: any) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

const Form = () => {
  const [input, setInput] = useState('');

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

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root') as HTMLElement
);
