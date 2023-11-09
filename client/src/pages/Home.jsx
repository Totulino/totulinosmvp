import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";

export default function Home() {
  const [trips, setTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState("");

  useEffect(() => {
    getTrips();
  }, []);

  async function getTrips() {
    const response = await fetch("/api/trips");
    const data = await response.json();
    setTrips(data);
  }

  return (
    <div>
      <h2>Where are we going today?</h2>
      <div>
        <select
          value={selectedTrip}
          onChange={(e) => setSelectedTrip(e.target.value)}
        >
          {trips.map((trip) => (
            <option key={trip.id} value={trip.id}>
              {trip.name}
            </option>
          ))}
        </select>
        <Link to={`/trips/${selectedTrip}`}>Go</Link>
      </div>
      <Outlet />
    </div>
  );
}
