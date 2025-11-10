import { StatusCodes } from "http-status-codes";
import UserModel from "../models/userModel.js";
import { BadRequestError, UnauthorizedError } from "../errors/index.js";
import attachCookie from "../utils/attachCookies.js";

// --------------------- REGISTER ---------------------
const register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      throw new BadRequestError(
        "Please provide your first and last name, email and password"
      );
    }

    // Check for duplicate email
    const userAlreadyExists = await UserModel.findOne({ email });
    if (userAlreadyExists) {
      throw new BadRequestError("This email is already in use");
    }

    const user = await UserModel.create(req.body);

    const token = user.createJWT();
    attachCookie({ res, token }); // sends cookie to frontend

    res.status(StatusCodes.CREATED).json({
      status: "success",
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        userLocation: user.userLocation,
        email: user.email,
      },
      userLocation: user.userLocation,
    });
  } catch (error) {
    next(error);
  }
};

// --------------------- LOGIN ---------------------
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new BadRequestError("Please provide your email and password");
    }

    const user = await UserModel.findOne({ email }).select("+password");
    if (!user) {
      throw new UnauthorizedError("Invalid credentials!");
    }

    const isPasswordCorrect = await user.comparePasswords(password);
    if (!isPasswordCorrect) {
      throw new UnauthorizedError("Invalid credentials!");
    }

    const token = user.createJWT();
    user.password = undefined; // hide password

    attachCookie({ res, token });

    res.status(StatusCodes.OK).json({
      status: "success",
      user,
      userLocation: user.userLocation,
    });
  } catch (error) {
    next(error);
  }
};

// --------------------- UPDATE USER ---------------------
const updateUser = async (req, res, next) => {
  try {
    const { firstName, lastName, userLocation, email } = req.body;
    if (!firstName || !lastName || !email) {
      throw new BadRequestError(
        "Please provide your first and last name, email"
      );
    }

    const user = await UserModel.findOne({ _id: req.user.userId });

    user.firstName = firstName;
    user.lastName = lastName;
    user.userLocation = userLocation;
    user.email = email;

    await user.save();

    const token = user.createJWT();
    attachCookie({ res, token });

    res.status(StatusCodes.OK).json({
      status: "success",
      user,
      userLocation: user.userLocation,
    });
  } catch (error) {
    next(error);
  }
};

// --------------------- GET CURRENT USER ---------------------
const getCurrentUser = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ _id: req.user.userId });

    res.status(StatusCodes.OK).json({
      status: "success",
      user,
      userLocation: user.userLocation,
    });
  } catch (error) {
    next(error);
  }
};

// --------------------- LOGOUT ---------------------
const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
    secure: process.env.NODE_ENV === "production",
    sameSite: "None",
  });

  res.status(StatusCodes.OK).json({ message: "User logged out!" });
};

export { register, login, updateUser, getCurrentUser, logout };
