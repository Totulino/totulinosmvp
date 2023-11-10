import { useState } from "react";
import "./App.css";
import { Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import Trip from "./pages/Trip";

function App() {
  return (
    <>
      <div>
        <Link to="/">Home</Link>
        <Link to="/trips"></Link>
      </div>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/trips/new/:type_id" element={<Trip />} />
        </Route>
      </Routes>
    </>
  );
}
export default App;
