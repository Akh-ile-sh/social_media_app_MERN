import User from "../model/User.js";

export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      loction,
      occupation,
      viewedProfile,
      impressions,
    } = req.body;

    const user = new User({
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      loction,
      occupation,
      viewedProfile,
      impressions,
    });

    await user.save();

    res.status(201).json(user);
  } catch (error) {
    res.json(error);
  }
};
