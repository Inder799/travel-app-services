import express from "express";
import hotelRouter from "./routes/hotel.router.js";
import mongoose from "mongoose";
import { connectDB } from "./config/dbconfig.js";
import hotelDataAddedToDBRouter from "./routes/dataimport.router.js";
import categoryAddedToDBRouter from "./routes/categoryimport.router.js";
import categoryRouter from "./routes/category.router.js";
import singleHotelRouter from "./routes/singlehotel.router.js";

const app = express();
app.use(express.json());
connectDB();

const PORT = 3500;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/hoteldata", hotelDataAddedToDBRouter);

app.use("/api/categorydata", categoryAddedToDBRouter);

app.use("/api/hotels", hotelRouter);

app.use("/api/category", categoryRouter);

app.use("/api/hotels", singleHotelRouter);

mongoose.connection.once("open", () => {
  console.log("Connected to DB");

  app.listen(process.env.PORT || PORT, () => {
    console.log("Server is up and running");
  });
});
