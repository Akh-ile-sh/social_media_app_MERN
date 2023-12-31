import User from "../model/User.js";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json(error.message);
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await promise.all(
      user.friends.map((id) => user.findById(id))
    );

    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.status(StatusCodes.OK).json(formattedFriends);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json(error.message);
  }
};

export const addRemoveFriends = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }

    await user.save();
    await friend.save();

    const friends = await promise.all(
      user.friends.map((id) => user.findById(id))
    );

    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.status(StatusCodes.OK).json(formattedFriends);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json(error.message);
  }
};
