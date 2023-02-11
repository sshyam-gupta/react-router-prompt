import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactRouterPrompt from "../src";
import { it } from "vitest";

it("renders without crashing", () => {
  const node = document.createElement("div");
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ReactRouterPrompt when={true}>
      {({ isActive, onConfirm, onCancel }) =>
        isActive && (
          <div>
            <div>
              <p>Do you really want to leave?</p>
              <button onClick={onCancel}>Cancel</button>
              <button onClick={onConfirm}>Ok</button>
            </div>
          </div>
        )
      }
    </ReactRouterPrompt>
    },
  ]);

  ReactDOM.createRoot(node).render(
    <RouterProvider router={router} />
  );
});
