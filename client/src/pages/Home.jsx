import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import types from "../utilities/types";

export default function Home() {
  const [selectedTrip, setSelectedTrip] = useState(1);

  async function getTrips() {
    const response = await fetch("/api/trips");
    const data = await response.json();
    getTrips(data);
  }

  return (
    <div className="container-fluid">
      <div className="row justify-content-start mt-3 ml-3">
        <div className="col-md-6">
          <h2>Where are we going today, biker?</h2>
          <div className="mb-3">
            <select
              value={selectedTrip}
              onChange={(e) => setSelectedTrip(e.target.value)}
              className="form-control"
            >
              {Object.keys(types).map((tripType) => (
                <option key={tripType} value={tripType}>
                  {types[tripType]}
                </option>
              ))}
            </select>
            <Link
              to={`/trips/new/${selectedTrip}`}
              className="btn btn-primary btn-sm ml-2"
            >
              Go
            </Link>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
