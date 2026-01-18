import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export async function getUsres(req, res) {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

export async function register(req, res) {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();
    return res.status(201).json({ message: "User registered successfully " });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Email already registerd" });
    }
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found with this email" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invaild Password try again" });
    } else {
      const token = jwt.sign(
        {
          id: user._id,
          role: user.role,
          name: user.name,
          email: user.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      return res.status(200).json({
        message: "Login Successfull",
        token,
        user: {
          name: user.name,
          email: user.email,
        },
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}
