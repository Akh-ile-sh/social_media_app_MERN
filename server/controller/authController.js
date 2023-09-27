import User from "../model/User.js";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import * as customError from "../errors/index.js";

export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      loction,
      occupation,
      viewedProfile,
      impressions,
    } = req.body;

    if (!firstName || !lastName || !email || !password)
      return res.status(StatusCodes.BAD_REQUEST).json("fill every field!!");

    const user = new User({
      firstName,
      lastName,
      email,
      password,
      picturePath,
      loction,
      occupation,
      viewedProfile,
      impressions,
    });

    await user.save();

    res.status(StatusCodes.CREATED).json(user);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json("enter  email and password!!");

    const user = await User.findOne({ email });
    if (!user)
      return res.status(StatusCodes.UNAUTHORIZED).json("NO such user exists!!");

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect)
      return res.status(StatusCodes.UNAUTHORIZED).json("Password incorrect!!");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.status(StatusCodes.OK).json({ token, user });
  } catch (error) {
    console.log(error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};
