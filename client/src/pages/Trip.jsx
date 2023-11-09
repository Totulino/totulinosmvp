import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Trip() {
  const [trip, setTrip] = useState({});
  const { id } = useParams();
  const [intervals, setIntervals] = useState({});
  const [geolocation, setGeolocation] = useState({});

  useEffect(() => {
    getTrip();
  }, [id]);

  async function getTrip() {
    const response = await fetch(`/api/trips/${id}`);
    const data = await response.json();
    setTrip(data);
  }

  async function getIntervals() {
    const response = await fetch("/intervals");
    const data = await response.json();
    setIntervals(data);
  }

  async function createNewTrip() {
    try {
      //should be POST
      const response = await fetch("/api/trips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: "New Trip" }),
      });
      // data should include the id of the new trip
      // return trip_id
      const result = await response.json();
      return result.tripId;
    } catch (error) {}
  }

  async function createNewInterval(trip_id) {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // should be a POST
        const response = await fetch(`/api/trips/tripd_id/inervals`);
        const data = await response.json();
        // data should include the id of the new trip
        // create a new interval
      });
    }
  }

  const handleStart = () => {
    // if ("geolocation" in navigator) {
    //   navigator.geolocation.getCurrentPosition((position) => {
    //     const latitude = position.coords.latitude;
    //     const longitude = position.coords.longitude;
    //     setGeolocation({ latitude, longitude });
    //   });
    // }
  };

  // function handleStartAndGetIntervals() {
  //   handleStart(); // Call the first function
  //   getIntervals(); // Call the second function
  // }

  return (
    <div>
      <h6>Trip Details</h6>
      <div>
        <button onClick={handleStart}>Start Biking</button>
      </div>
      <div></div>
    </div>
  );
}
