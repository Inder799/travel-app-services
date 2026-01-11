import express from "express";
import { Category } from "../model/category.model.js";

const router = express.Router();

router.route("/").get(async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (err) {
    res.status(404).json({ message: "Could not found categories" });
  }
});

export default router;
