const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
    },
    lastName: {
      type: String,
      required: true,
    },
    emailId: {
      type: String,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validator(value) {
        if (!["male", "female", "others"].includes(value.toUpperCase())) {
          throw new Error("Gender data not found!");
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://dummycomp.shopespot.com/uploads/partner/254/promo_images/2024/05/dummy-user.png",
    },
    about: {
      type: String,
      default: "This is the default desciption about the User",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
