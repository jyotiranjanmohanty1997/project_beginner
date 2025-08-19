const { JsonWebTokenError } = require("jsonwebtoken");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      // index:true,
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
      unique: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email" + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      unique: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter Strong Password !" + value);
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "others"],
        message: `{values} is not a valid gender type!`,
      },
      // validator(value) {
      //   if (!["male", "female", "others"].includes(value.toUpperCase())) {
      //     throw new Error("Gender data not found!");
      //   }
      // },
    },
    photoUrl: {
      type: String,
      default:
        "https://dummycomp.shopespot.com/uploads/partner/254/promo_images/2024/05/dummy-user.png",
      validator(value) {
        if (!validator.isURL(value)) {
          throw new Error("invalid Photo URL : " + value);
        }
      },
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

// userSchema.index({ firstName: 1, lastName: 1 });

userSchema.methods.getJWT = async function () {
  const user = this;

  const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$790", {
    expiresIn: "1h",
  });
  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;

  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
  );

  return isPasswordValid;
};

module.exports = mongoose.model("User", userSchema);
