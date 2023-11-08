import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [trips, setTrips] = useState([]);

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
      <h1> Where are we going today?</h1>
      <select>
        <option value="text">Select a trip</option>
        {trips.map((trip) => (
          <option key={trip.id} value={trip.name}>
            {trip.name}
          </option>
        ))}
      </select>
    </div>
  );
}
