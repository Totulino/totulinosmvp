import { useState } from "react";
import "./App.css";
import { Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
// import Trips from "./pages/Trips";

function App() {
  return (
    <>
      Let's Bike
      <div>
        <Link to="/">Home</Link>
        <Link to="/trips/:id"></Link>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/trips/:id" element={<Trips />} /> */}
      </Routes>
    </>
  );
}
export default App;
