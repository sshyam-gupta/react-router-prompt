import * as React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import Form from "./Form";

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
