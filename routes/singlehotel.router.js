import express from "express";
import { singlehotelHandler } from "../controllers/singleHotelController.js";

const router = express.Router();

router.route("/:id").get(singlehotelHandler);

export default router;
