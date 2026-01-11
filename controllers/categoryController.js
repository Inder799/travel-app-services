import { Category } from "../model/category.model.js";

export const categoryHandler = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (err) {
    res.status(404).json({ message: "Could not found categories" });
  }
};
