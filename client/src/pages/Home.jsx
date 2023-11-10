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
    <div>
      <h2>Where are we going today?</h2>
      <div>
        <select
          value={selectedTrip}
          onChange={(e) => setSelectedTrip(e.target.value)}
        >
          {Object.keys(types).map((tripType) => (
            <option key={tripType} value={tripType}>
              {types[tripType]}
            </option>
          ))}
        </select>
        <Link to={`/trips/new/${selectedTrip}`}>Go</Link>
      </div>
      <div></div>
      <Outlet />
    </div>
  );
}
