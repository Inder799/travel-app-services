import express from "express";
import { getAllHotelHandler } from "../controllers/hotelController.js";

const router = express.Router();

router.route("/").get(getAllHotelHandler);

export default router;
