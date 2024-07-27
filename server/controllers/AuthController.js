import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/UserModel.js";

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (email, userId) => {
  return jwt.sign({ email, userId }, process.env.JWT_KEY, {
    expiresIn: maxAge,
  });
};

export const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = await User.create({ email, password });
    res.cookie("jwt", createToken(email, user._id), {
      maxAge,
      secure: true,
      sameSite: "None",
    });
    return res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.cookie('jwt', createToken(email, user._id),{
      maxAge,
      secure: true,
      sameSite: 'None'
    })
    return res.status(200).json({ message: "User logged in successfully", user:{
      _id: user._id,
      email: user.email,
      profileSetup: user.profileSetup,
      firstName: user.firstName,
      lastName: user.lastName,
      image: user.image,
      color: user.color,
    } });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server error" });
  }
};
