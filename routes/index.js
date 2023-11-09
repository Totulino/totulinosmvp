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

//INSERT
router.post("/trips", async function (req, res, next) {
  const { name } = req.body;
  try {
    await db(`INSERT INTO trips (name) VALUES ( "${name}");`);
    const result = await db("SELECT id FROM trips ORDER BY id DESC LIMIT 1");
    const tripId = result.id;
    //select from trips - order by id descending-limit results to 1
    //grab trip id - send to client (object)
    res
      .status(201)
      .json({ message: "Trip added successfully", tripId: tripId });
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

//INSERT a new interval depending on trip_id
router.post("/trips/:trip_id/intervals", async function (req, res, next) {
  const { interval_longitude, interval_latitude } = req.body;
  const { trip_id } = req.params;

  try {
    await db(
      `INSERT INTO intervals (trip_id, interval_longitude, interval_latitude, interval_time) VALUES (${trip_id}, "${interval_longitude}", "${interval_latitude}", NOW())`
    );
    res.status(201).send("Interval added successfully");
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
