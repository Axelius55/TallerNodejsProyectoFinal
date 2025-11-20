// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Employees from "./pages/employees";
import './index.css'

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/employees" element={<Employees />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
