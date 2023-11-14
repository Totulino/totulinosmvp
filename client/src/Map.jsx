// import React, { useEffect, useState } from "react";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";

// const MapComponent = ({ intervals }) => {
//   const [mapId] = useState(`map-${Math.random()}`);

//   useEffect(() => {
//     if (intervals.length === 0) {
//       return;
//     }

//     const map = L.map(mapId).setView(
//       [intervals[0]?.interval_latitude, intervals[0]?.interval_longitude],
//       15
//     );

//     L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//       attribution:
//         'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//     }).addTo(map);

//     intervals.forEach((interval, index) => {
//       L.marker([interval.interval_latitude, interval.interval_longitude])
//         .addTo(map)
//         .bindPopup(`Interval ${index + 1}`)
//         .openPopup();
//     });
//   }, [intervals, mapId]);

//   return <div id={mapId} style={{ height: "400px" }} />;
// };

// export default MapComponent;
