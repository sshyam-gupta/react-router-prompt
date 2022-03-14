import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, NavLink, Routes, Route } from "react-router-dom";
import ReactRouterPrompt from "./index";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

function App() {
  return (
    <div>
      <nav>
        <NavLink to="/">Home</NavLink>
        &nbsp;&nbsp;&nbsp;
        <NavLink to="/prompt">Prompt</NavLink>
      </nav>

      <Routes>
        <Route index element={<Home />} />
        <Route path="/prompt" element={<Form />} />
      </Routes>
    </div>
  );
}

function Home() {
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}

function Form() {
  const [input, setInput] = useState("");

  return (
    <div>
      <h1>About</h1>
      <ReactRouterPrompt when={input.length >= 1}>
        {({ isActive, onConfirm, onCancel }) =>
          isActive && (
            <div>
              <p>Unsaved Changes. Are you sure you wish to exit?</p>
              <button onClick={onCancel}>Cancel</button>
              <button onClick={onConfirm}>Ok</button>
            </div>
          )
        }
      </ReactRouterPrompt>
      <form>
        <label>Text Entry</label>
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          placeholder="Enter something"
        />
      </form>

      <p>
        Typing more than 1 character in the input cause the prompt to show on
        navigation
      </p>
    </div>
  );
}
