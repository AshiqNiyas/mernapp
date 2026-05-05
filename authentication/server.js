import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/authRoutes.js";
import cors from "cors";
import { protect, authorize } from "./middlewares/authMiddleware.js";
dotenv.config();
import connectDB from "./db/connectDB.js";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", authRouter);

app.get("/profile", protect, (req, res) => {
  res.json({ message: "Welcome to profile" });
});

app.get("/dashboard", protect, authorize("admin"), (req, res) => {
  res.json({ message: "Welcome to dashboard" });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

connectDB();
