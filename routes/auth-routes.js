import express from "express";
import rateLimiter from "express-rate-limit";
import authVerification from "../middleware/auth.js";
import testUser from "../middleware/testUser.js";
import {
  register as registerController,
  login as loginController,
  updateUser,
  getCurrentUser,
  logout as logoutController,
} from "../controllers/auth-controllers.js";

const router = express.Router();

// Rate limiter
const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message:
    "Too many requests from this IP address. Please try again in 15 minutes",
});

// --------------------- REGISTER ---------------------
router.post("/register", apiLimiter, registerController);

// --------------------- LOGIN ---------------------
router.post("/login", apiLimiter, loginController);

// --------------------- UPDATE USER ---------------------
router.patch("/updateUser", authVerification, testUser, updateUser);

// --------------------- GET CURRENT USER ---------------------
router.get("/getCurrentUser", authVerification, getCurrentUser);

// --------------------- LOGOUT ---------------------
router.get("/logout", logoutController);

export default router;
