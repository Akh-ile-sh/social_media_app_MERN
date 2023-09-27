import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 1,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 1,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      min: 5,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 4,
      max: 50,
    },
    picturePath: {
      type: String,
      default: "",
    },
    friends: {
      type: Array,
      default: [],
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number,
  },
  { timestamps: true }
);

// Hash the password before saving it to the database
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    return next(err);
  }
});

// Method to compare hashed password with the provided password
UserSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (err) {
    throw new Error("Comparison failed");
  }
};

const User = mongoose.model("User", UserSchema);
export default User;
