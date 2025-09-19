import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import userRouter from "./routes/userRoutes.js";
import imageRouter from "./routes/imageRoutes.js";
import paymentRouter from "./routes/paymentRoutes.js";

const PORT = process.env.PORT || 4000;
const app = express();

app.use("/api/payment/webhook", express.raw({ type: "application/json" }));
app.use(express.json());
app.use(cors());
await connectDB();

app.use("/api/user", userRouter);
app.use("/api/image", imageRouter);
app.use("/api/payment", paymentRouter);
app.get("/", (req, res) => res.send("API Working Fine"));

app.listen(PORT, () => console.log("Server running on port " + PORT));
