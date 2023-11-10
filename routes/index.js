var express = require("express");
var router = express.Router();
const db = require("../model/helper");

//GETs all trips
router.get("/trips", function (req, res, next) {
  db("SELECT * FROM trips;")
    .then((results) => {
      res.send(results.data);
    })
    .catch((err) => res.status(500).send(err));
});

//GET trip depending from id
router.get("/trips/:id", function (req, res, next) {
  const { id } = req.params;
  db(`SELECT * FROM trips WHERE id=${id} ;`)
    .then((results) => {
      res.send(results.data);
    })
    .catch((err) => res.status(500).send(err));
});

//INSERT a new trip intro trips and returns the id
router.post("/trips/new", async function (req, res, next) {
  const { name } = req.body;
  try {
    //select from trips - order by id descending-limit results to 1
    await db(`INSERT INTO trips (name) VALUES ( "${name}");`);
    const result = await db("SELECT id FROM trips ORDER BY id DESC LIMIT 1");
    //grab trip id - send to client (object)
    // const trip_id = result.id;
    res
      .status(201)
      .send({ trip_id: result.data[0].id, msg: "Trip added successfully" });
  } catch (err) {
    res.status(500).send(err);
  }
});

/* GET intervals  */
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

// routes and DELETE

module.exports = router;
