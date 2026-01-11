import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";

export const loginHandler = async (req, res) => {
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
};
