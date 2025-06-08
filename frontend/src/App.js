import React from "react";
import { Routes, Route } from "react-router-dom";
import CarDataGrid from "../src/components/CarDataGrid";
import CarDetails from "../src/components/CarDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<CarDataGrid />} />
      <Route path="/details/:id" element={<CarDetails />} />
    </Routes>
  );
}

export default App;
