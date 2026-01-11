import express from "express";
import { Hotel } from "../model/hotel.model.js";

const router = express.Router();

router.route("/").get(async (req, res) => {
  try {
    const hotels = await Hotel.find({});
    hotels
      ? res.json(hotels)
      : res.status(404).json({ message: "No data found" });
  } catch (err) {
    console.log(err);
    return err;
  }
});

export default router;
