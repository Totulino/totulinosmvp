var express = require("express");
var router = express.Router();
const db = require("../model/helper");

//GET trips this works
router.get("/trips", function (req, res, next) {
  db("SELECT * FROM trips;")
    .then((results) => {
      res.send(results.data);
    })
    .catch((err) => res.status(500).send(err));
});

//INSERT a new trip  in trips adds correctly but i need to manually fill in the id
router.post("/trips", async function (req, res, next) {
  const { id, name } = req.body;
  try {
    await db(`INSERT INTO trips VALUES (${id} , "${name}");`);
    res.status(201).send("Trip added successfully");
  } catch (err) {
    res.status(500).send(err);
  }
});

/* GET intervals this works  */
router.get("/intervals", function (req, res, next) {
  db(`SELECT * FROM intervals;`)
    .then((results) => {
      res.send(results.data);
    })
    .catch((err) => res.status(500).send(err));
});

// //INSERT a new interval
// router.post("/interval", async function (req, res, next) {
//   const { trip_id, interval_longitude, interval_latitude } = req.body;
//   if("geolocation" in navigator) {
// navigator.geolocation.getCurrentPosition()
//   try {
//     await db(
//       `INSERT INTO intervals (trip_id, interval_longitude, interval_latitude, interval_time) VALUES ()`
//     );
//     res.status(201).send("Interval added successfully");
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

module.exports = router;
