import jwt from "jsonwebtoken";

export const verifyUser = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
      if (err) {
        res.status(403).json({ message: "Invalid Token" });
      }
      res.user = user;
      next();
    });
  } else res.status(401).json({ message: "Token is required" });
};
