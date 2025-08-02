const jwt = require("jsonwebtoken");
const User = require("../models/user");
const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      throw new Error("Token is not Valid!");
    } 

    const decodeObj = await jwt.verify(token, "DEV@Tinder$790");

    const { _id } = decodeObj;

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not Found!");
    } 
      req.user = user;
      next();
  } catch (err) {
    res.status(401).send("Error :" + err.message);
  }
};

module.exports = { userAuth };
