import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../errors/index.js";

const auth = (req, res, next) => {
  try {
    // Get token from cookie
    const token = req.cookies.token;

    if (!token) {
      throw new UnauthorizedError("Authentication invalid!");
    }

    // Verify JWT
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // Check if this is a test user (optional)
    const testUser = payload.userId === "6420b6c2e1641997687bfb3f";

    // Attach user info to req object
    req.user = { userId: payload.userId, testUser };

    next();
  } catch (err) {
    console.error("Auth middleware error:", err.message);
    throw new UnauthorizedError("Authentication invalid!");
  }
};

export default auth;
