import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.route";
import calenderRoute from "./routes/calender.route";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth");
app.use("api/calender");

app.get("/", (req, res) => {
  res.json("hi there server is running");
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`serving at PORT ${PORT}`);
});
