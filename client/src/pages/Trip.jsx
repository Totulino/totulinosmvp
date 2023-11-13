import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import types from "../utilities/types";

export default function Trip() {
  // let trip_id = null;
  // let hasStarted = false;
  const [trip_id, setTripId] = useState(null);
  const [hasStarted, setHasStarted] = useState(false);
  const { type_id } = useParams();
  const [intervals, setIntervals] = useState([]);

  async function createNewTrip() {
    try {
      const response = await fetch("/api/trips/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: types[type_id],
        }),
      });

      const result = await response.json();
      return result.trip_id;
    } catch (error) {}
  }

  async function createNewInterval(interval) {
    try {
      const response = await fetch(`/api/trips/${interval.trip_id}/intervals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(interval),
      });
      const result = await response.json();
      setIntervals(result);
    } catch (error) {}
  }

  async function getLocationAndCreateInterval() {
    console.log("Trip ID:", trip_id);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const interval_latitude = position.coords.latitude;
        const interval_longitude = position.coords.longitude;

        createNewInterval({ interval_latitude, interval_longitude, trip_id });
      });
    }
  }
  // const handleStart = async () => {
  //   trip_id = await createNewTrip();
  //   hasStarted = true;
  // };

  const handleStart = async () => {
    const newTripId = await createNewTrip();
    setTripId(newTripId);
    setHasStarted(true);
  };

  // const handleStop = async () => {
  //   hasStarted = false;
  // };

  // React hook made for me
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
    // do I have to add the getLocation and Create Interval
  }

  useInterval(() => {
    if (hasStarted) getLocationAndCreateInterval();
  }, 5000);

  return (
    <div>
      <div>
        <h2>Trip Details: </h2>
        <h6> These are your intervals: </h6>
        <p>
          {intervals.map((interval) => (
            <li key={interval.id}>
              Longitude: {interval.interval_longitude}, Latitude:
              {interval.interval_latitude}
            </li>
          ))}
        </p>
      </div>

      <div>
        <button onClick={handleStart} type="button" className="btn btn-success">
          Start Biking
        </button>
      </div>
      <div>
        {/* <button onClick={handleStop} type="button" className="btn btn-danger">
          Stop Biking
        </button> */}
      </div>
    </div>
  );
}
