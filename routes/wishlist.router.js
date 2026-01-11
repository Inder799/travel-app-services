import express from "express";
import { verifyUser } from "../middleware/verifyUser.js";
import {
  createWishlist,
  deleteWishlist,
  getWishlist,
} from "../controllers/wishlistController.js";

const router = express.Router();

router.route("/").post(verifyUser, createWishlist);

router.route("/:id").delete(verifyUser, deleteWishlist);

router.route("/").get(verifyUser, getWishlist);

export default router;
