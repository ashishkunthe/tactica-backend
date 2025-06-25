import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.route";
import calenderRoute from "./routes/calender.route";
import mongoose from "mongoose";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/calender", calenderRoute);

const PORT = process.env.PORT;

mongoose
  .connect(process.env.MONGODB_URL as string)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running at PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
