import express from "express";
import { User } from "../model/user.model.js";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.route("/register").post(async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username,
      number: req.body.number,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASSWORD_SECRET_KEY
      ).toString(),
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Unable to Register User" });
  }
});

router.route("/login").post(async (req, res) => {
  try {
    const user = await User.findOne({ number: req.body.number });
    !user &&
      res.status(401).json({ message: "Invalid Mobile Number or Password" });

    const decodedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASSWORD_SECRET_KEY
    ).toString(CryptoJS.enc.Utf8);
    decodedPassword !== req.body.password &&
      res.status(401).json({ message: "Incorrect Password" });

    const accessToken = jwt.sign(
      { username: user.username },
      process.env.ACCESS_TOKEN
    );
    const { password, ...rest } = user._doc;
    res.json({ ...rest, accessToken });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Unable to Login" });
  }
});

export default router;
