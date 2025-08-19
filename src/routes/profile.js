const express = require("express");
const profileRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../util/Validation");
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    // console.log(user);
    res.send(user);
  } catch (error) {
    res.status(400).send("Error ! : " + error.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request !");
    }
    const loggedinUser = req.user;
    // loggedinUser.firstName = req.body.firstName;

    Object.keys(req.body).forEach((key) => (loggedinUser[key] = req.body[key]));
    console.log(loggedinUser);
    await loggedinUser.save();
    res.send({
      message: `${loggedinUser.firstName}, Your Profile is updated Successfully!`,
      data: loggedInUser,
    });
  } catch (error) {
    res.status(400).send("Error ! :" + error.message);
  }
});

module.exports = profileRouter;
