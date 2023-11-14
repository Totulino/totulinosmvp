import { useState } from "react";
import "./App.css";
import { Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import Trip from "./pages/Trip";

function App() {
  return (
    <div className="container-fluid">
      <div className="row justify-content-center mt-3">
        <div className="col-md-6"></div>
        <div>
          <Link to="/" className="btn btn-dark btn-sm">
            Home{" "}
          </Link>
          {/* <Link to="/trips/new/:type_id"></Link> */}
        </div>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/trips/new/:type_id" element={<Trip />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}
export default App;
