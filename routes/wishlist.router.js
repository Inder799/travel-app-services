import express from "express";
import { Wishlist } from "../model/wishlist.model.js";
import { verifyUser } from "../middleware/verifyUser.js";

const router = express.Router();

router.route("/").post(verifyUser, async (req, res) => {
  const newWishlist = new Wishlist(req.body);
  try {
    const savedWishlist = await newWishlist.save();
    res.status(201).json(savedWishlist);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create wishlist" });
  }
});

router.route("/:id").delete(verifyUser, async (req, res) => {
  try {
    await Wishlist.findByIdAndDelete(req.params.id);
    res.json({ message: "Hotel Deleted from Wishlist" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Could not delete hotel from the Wishlist" });
  }
});

router.route("/").get(verifyUser, async (req, res) => {
  try {
    const wishlist = await Wishlist.find({});
    wishlist
      ? res.json(wishlist)
      : res.json({ message: "No items found in the wishlist" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

export default router;
