import express from "express";
import { categoryHandler } from "../controllers/categoryController.js";

const router = express.Router();

router.route("/").get(categoryHandler);

export default router;
