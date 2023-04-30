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

function delayPromise(ms = 1000) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

function Form() {
  const [input, setInput] = useState("")

  return (
    <div>
      <h1>About</h1>

      <ReactRouterPrompt
        when={input.length >= 1}
        beforeConfirm={async () => {
          await delayPromise()
          await fetch("https://api.zippopotam.us/in/400072")
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.log("error", error))
        }}
        beforeCancel={() => delayPromise()}
      >
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
