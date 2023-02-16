import { auth } from "../middleware/auth.js";
import express from "express";
import { connectDatabase } from "../pool.js";

const router = express.Router();
const pool = connectDatabase();

router.get("/feeds", auth, async (req, res) => {
  try {
    const feeds = await pool.query("SELECT * FROM feeds");

    res.json(feeds.rows);
  } catch (error) {
    console.log(error);
  }
});
router.post("/editFeeds", auth, async (req, res) => {
  try {
    const { stocks, name_id } = req.body;
    // console.log(req.body);
    const editFeeds = await pool.query(
      "UPDATE feeds SET stocks = $1 WHERE name_id=$2",
      [stocks, name_id]
    );

    res.json("feeds have been edited");
  } catch (error) {
    console.log(error);
  }
});

router.post("/feeds", auth, async (req, res) => {
  try {
    const { name, stocks } = req.body;

    const addFeed = await pool.query(
      "INSERT INTO feeds (name, stocks) VALUES($1, $2)",
      [name, stocks]
    );
    res.json("new Feeds added");
  } catch (error) {
    console.log(error);
  }
});

router.delete("/feeds/:name_id", auth, async (req, res) => {
  try {
    const { name_id } = req.params;
    // console.log(req.params);
    const deleteFeed = await pool.query("DELETE FROM feeds WHERE name_id=$1", [
      name_id,
    ]);
    res.json("Feed was deleted");
  } catch (error) {
    console.log(error);
  }
});

router.get("/countFeeds", auth, async (req, res) => {
  try {
    const count = await pool.query("SELECT count(*) from feeds");
    // console.log(count);

    res.json(count.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

export default router;
