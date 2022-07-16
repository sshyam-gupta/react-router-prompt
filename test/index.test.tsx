import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import ReactRouterPrompt from "../src";

describe("it", () => {
  it("renders without crashing", () => {
    const node = document.createElement("div");
    ReactDOM.render(
      <BrowserRouter>
        <ReactRouterPrompt when={true}>
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
      </BrowserRouter>,
      node
    );
    ReactDOM.unmountComponentAtNode(node);
  });
});
