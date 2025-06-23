import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/userModel";
import jwt from "jsonwebtoken";

const jwt_secret = process.env.JWT_SECRET as string;

export async function registerUser(req: Request, res: Response) {
  const { username, email, password } = req.body;

  try {
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.json({ message: "user already exist with this email" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username: username,
      email: email,
      password: hashedPassword,
    });

    const token = jwt.sign({ userId: user._id }, jwt_secret);

    res.status(201).json({
      message: "user register sucessful",
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "something went wrong try again",
    });
  }
}

export async function loginUser(req: Request, res: Response) {
  const { email, password } = req.body;
  try {
    const finduser = await User.findOne({ email });
    if (!finduser) {
      return res.status(401).json({
        message: "you may don't have registered",
      });
    }
    const passwordCompare = await bcrypt.compare(password, finduser.password);

    if (!passwordCompare) {
      return res.status(401).json({
        message: "invalid password",
      });
    }

    const token = jwt.sign({ userId: finduser._id }, jwt_secret);

    res.status(200).json({
      message: "login sucessfull",
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      message: "something went wrong",
    });
  }
}
