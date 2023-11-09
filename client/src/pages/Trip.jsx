import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Trip() {
  const [trip, setTrip] = useState({});
  const { id } = useParams();

  useEffect(() => {
    getTrip();
  }, [id]);

  async function getTrip() {
    const response = await fetch(`/api/trips/${id}`);
    const data = await response.json();
    setTrip(data);
  }

  return (
    <div>
      <h1>Trip Details</h1>
      <div></div>
      <button onClick={handleStart}>Start </button>
    </div>
  );
}
