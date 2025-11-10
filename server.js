import path, { dirname } from "path";
import dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();

import mongoose from "mongoose";
mongoose.set("strictQuery", true);

import "express-async-errors";
import morgan from "morgan";

// Security packages
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
import cors from "cors";
import cookieParser from "cookie-parser";

// Middleware
import authRoutes from "./routes/auth-routes.js";
import jobRoutes from "./routes/job-routes.js";
import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";
import authVerification from "./middleware/auth.js";
import { fileURLToPath } from "url";

const port = process.env.PORT || 9000;

// Parsers
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// Trust proxy for Render (required for cookies)
app.set("trust proxy", 1);

// CORS configuration for frontend
const corsOptions = {
  origin: "https://job-tracker-qvse.onrender.com", // exact frontend URL
  credentials: true, // allow cookies to be sent
};
app.use(cors(corsOptions));

// Security middleware
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

// Logging in dev
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// API routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/jobs", authVerification, jobRoutes);

// Serve frontend React build
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "./client/build")));
app.use("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

// Error handling middleware
app.use(errorHandler);
app.use(notFound);

// Start server with MongoDB connection
const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); // ✅ ensure this matches your Render env
    console.log("MongoDB connected!");

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Startup error:", error);
  }
};

start();
