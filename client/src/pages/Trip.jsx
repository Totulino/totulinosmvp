import { useState } from "react";
import { useParams } from "react-router-dom";
import types from "../utilities/types";
import useInterval from "../hooks/useInterval";
// import Map from "../Map";

let trip_id = null;
export default function Trip() {
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
    console.log("new interval", interval);
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
  const handleStart = async () => {
    trip_id = await createNewTrip();
    console.log(trip_id);
    setHasStarted(true);
  };
  const handleStop = async () => {
    setHasStarted(false);
  };
  const handleResume = async () => {
    setHasStarted(true);
  };
  useInterval(() => {
    if (hasStarted) getLocationAndCreateInterval();
  }, 5000);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-8">
          <h2>{`Trip number: ${trip_id}`}</h2>

          {hasStarted && <h6>These are your intervals:</h6>}

          <p>
            {intervals.map((interval) => (
              <li key={interval.id}>
                Longitude: {interval.interval_longitude}, Latitude:
                {interval.interval_latitude}
              </li>
            ))}
          </p>
        </div>
        <div className="col-md-4">
          <div className="row">
            <div className="col-md-6">
              <button
                onClick={handleStart}
                type="button"
                className="btn btn-success btn-block"
              >
                Start Biking
              </button>
            </div>
            <div className="col-md-6">
              <button
                onClick={handleStop}
                type="button"
                className="btn btn-danger btn-block"
              >
                Stop Biking
              </button>
            </div>
          </div>
          {!hasStarted && (
            <div className="row">
              <div className="col-md-12">
                <button
                  onClick={handleResume}
                  type="button"
                  className="btn btn-warning btn-block"
                >
                  Resume Biking
                </button>
              </div>
            </div>
          )}
          {/* <Map intervals={intervals} /> */}
        </div>
      </div>
    </div>
  );
}
