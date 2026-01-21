import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import userRouter from "./routes/userRoutes.js";
import imageRouter from "./routes/imageRoutes.js";
import paymentRouter from "./routes/paymentRoutes.js";

const PORT = process.env.PORT || 4000;
const app = express();

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "DreamForge API is running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

app.use("/api/payment/webhook", express.raw({ type: "application/json" }));
app.use(express.json());
app.use(cors());
await connectDB();

app.use("/api/user", userRouter);
app.use("/api/image", imageRouter);
app.use("/api/payment", paymentRouter);
app.get("/", (req, res) => res.send("API Working Fine"));

// Self-ping function to keep server awake on Render
const startSelfPing = () => {
  const RENDER_EXTERNAL_URL = process.env.RENDER_EXTERNAL_URL;

  if (RENDER_EXTERNAL_URL && process.env.NODE_ENV === "production") {
    console.log("🔄 Starting self-ping service to prevent server sleep...");

    const pingInterval = setInterval(
      async () => {
        try {
          const response = await fetch(`${RENDER_EXTERNAL_URL}/health`);
          if (response.ok) {
            console.log("✅ Self-ping successful - server kept awake");
          } else {
            console.log(
              "⚠️ Self-ping returned non-200 status:",
              response.status,
            );
          }
        } catch (error) {
          console.log("❌ Self-ping failed:", error.message);
        }
      },
      10 * 60 * 1000,
    ); // Ping every 14 minutes

    // Clear interval on server shutdown
    process.on("SIGTERM", () => {
      clearInterval(pingInterval);
    });

    process.on("SIGINT", () => {
      clearInterval(pingInterval);
    });
  } else if (process.env.NODE_ENV === "production") {
    console.log("⚠️ RENDER_EXTERNAL_URL not set - self-ping disabled");
  } else {
    console.log("🔧 Development mode - self-ping disabled");
  }
};

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);

  // Start self-ping after server is running
  startSelfPing();
});
