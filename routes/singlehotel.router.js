import express from "express";
import { Hotel } from "../model/hotel.model.js";

const router = express.Router();

router.route("/:id").get(async (req, res) => {
  try {
    const { id } = req.params;
    const hotel = await Hotel.findById(id);
    res.json(hotel);
  } catch (err) {
    res.status(404).json({ message: "No Hotel found" });
  }
});

export default router;
