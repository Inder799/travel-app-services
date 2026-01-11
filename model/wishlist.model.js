import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
  hotelId: { type: String, required: true },
});

export const Wishlist = mongoose.model("Wishlist", wishlistSchema);
