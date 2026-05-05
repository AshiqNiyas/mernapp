import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.json({ error: "Some fields are empty" });
  }

  const userwithusername = await userModel.findOne({ username });
  if (userwithusername) {
    return res.json({ error: "This username is already taken" });
  }
  const userwithemail = await userModel.findOne({ email });
  if (userwithemail) {
    return res.json({
      error: "This email is already associated with another account",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await userModel.create({
    username,
    email,
    password: hashedPassword,
  });

  return res.json({ message: "User registered successfully" });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({ error: "All fields are required" });
  }

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.json({ error: "You are not registered" });
  }

  const verified = await bcrypt.compare(password, user.password);

  if (!verified) {
    return res.json({ error: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );
  res.json(token);
};
