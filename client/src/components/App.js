import React from "react";
import { Routes, Route } from "react-router-dom";
import CarDataGrid from "../components/DataGrid";
import CarDetails from "../components/CarDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<CarDataGrid />} />
      <Route path="/details/:id" element={<CarDetails />} />
    </Routes>
  );
}

export default App;
