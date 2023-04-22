import React, { useState } from "react"
import ReactDOM from "react-dom/client"
import {
  createBrowserRouter,
  RouterProvider,
  NavLink,
  Outlet,
} from "react-router-dom"

import ReactRouterPrompt from "."

function Home() {
  return (
    <div>
      <h1>Home</h1>
    </div>
  )
}

function Form() {
  const [input, setInput] = useState("")
  const [input2, setInput2] = useState("")

  return (
    <div>
      <h1>About</h1>
      <ReactRouterPrompt when={input.length >= 1} key={1}>
        {({ isActive, onConfirm, onCancel }) =>
          isActive && (
            <div className="lightbox">
              <div className="container">
                <p>Do you really want to leave?</p>
                <button type="button" onClick={onCancel}>
                  Cancel
                </button>
                <button type="submit" onClick={onConfirm}>
                  Ok
                </button>
              </div>
            </div>
          )
        }
      </ReactRouterPrompt>

      <input
        onChange={(e) => setInput(e.target.value)}
        value={input}
        placeholder="Enter something"
      />

      <input
        onChange={(e) => setInput2(e.target.value)}
        value={input2}
        placeholder="Enter something"
      />

      <ReactRouterPrompt when={input2.length >= 1} key={2}>
        {({ isActive, onConfirm, onCancel }) =>
          isActive && (
            <div className="lightbox">
              <div className="container">
                <p>Do you really want to leave?</p>
                <button type="button" onClick={onCancel}>
                  Cancel
                </button>
                <button type="submit" onClick={onConfirm}>
                  Ok
                </button>
              </div>
            </div>
          )
        }
      </ReactRouterPrompt>

      <p>
        Typing more than 1 character in the input cause the prompt to show on
        navigation
      </p>
    </div>
  )
}

function Root() {
  return (
    <div>
      <nav>
        <NavLink to="/">Home</NavLink>
        &nbsp;&nbsp;&nbsp;
        <NavLink to="/promptable">Prompt</NavLink>
      </nav>
      <Outlet />
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/promptable",
        element: <Form />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
