import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import types from "../utilities/types";

export default function Trip() {
  const [trip, setTrip] = useState({});
  const { type_id } = useParams();
  const [intervals, setIntervals] = useState({});
  const [geolocation, setGeolocation] = useState({});

  function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  async function getTrip() {
    const response = await fetch(`/api/trips`);
    const data = await response.json();
    setTrip(data);
  }

  async function getIntervals() {
    const response = await fetch("/api/intervals");
    const data = await response.json();
    setIntervals(data);
  }

  async function createNewTrip() {
    try {
      //should be POST
      const response = await fetch("/api/trips/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: types[type_id],
        }),
      });
      // data should include the id of the new trip
      // return trip_id
      const result = await response.json();
      return result.trip_id;
    } catch (error) {}
  }

  async function createNewInterval(interval) {
    try {
      //should be POST
      const response = await fetch(`/api/trips/${interval.trip_id}/intervals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(interval),
      });
      // data should include the id of the new trip
      const result = await response.json();
    } catch (error) {}
  }

  async function getLocationAndCreateInterval(trip_id) {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const interval_longitude = position.coords.latitude;
        const interval_latitude = position.coords.longitude;

        createNewInterval({ interval_latitude, interval_longitude, trip_id });
      });
    }
  }
  const handleStart = async () => {
    const trip_id = await createNewTrip();
    getLocationAndCreateInterval(trip_id);
  };
  const fetchIntervals = async () => {
    try {
      const response = await fetch("/api/intervals");
      const data = await response.json();
      setIntervals(data);
    } catch (error) {
      console.error("Error fetching intervals:", error);
    }
  };

  useInterval(() => {
    fetchIntervals();
  }, 30000);

  return (
    <div>
      <div>
        <h2>Trip Details: </h2>
        <h6> Intervals </h6>
        <ul>
          {intervals.map((interval) => (
            <li key={interval.id}>
              Longitude: {interval.interval_longitude}, Lataitude:
              {interval.interval_latitude}
            </li>
          ))}
        </ul>
      </div>
      <h2>Trip Details: </h2>

      <div>
        <button onClick={handleStart}>Start Biking</button>
      </div>
      <div></div>
    </div>
  );
}
