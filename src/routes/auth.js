const express = require("express");
const authRouter = express.Router();

const {validateSignUpData} = require("../util/Validation");
const User = require("../models/user");
const bcrypt= require("bcrypt");
const {userAuth} = require("../middlewares/auth");

authRouter.post("/signup", async (req, res) => {
  // console.log(req.body);
  // const userEmail = newuserMail(lastName:req.body);

  try {
    validateSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.send("User added Successfully!");
  } catch (err) {
    res.status(400).send("Error! " + err.message);
  }
  // it use to add new user with the help of json()

  //  it use for add user in writing without json()

  // const user = new User({
  //   firstName: "Sachin",
  //   lastName: "Tendulkar",
  //   emailId: "sachin10@gmail.com",
  //   password: "sachin@10",
  // });

  // try {
  // await user.save();
  // res.send("User added Successfully!");
  // } catch(err){
  //   res.status(400).send("Error!")
  // }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credential !");
    }
    // const isPasswordValid = await bcrypt.compare(password, user.password);

    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      const token = await user.getJWT();
      console.log(token);

      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send("Login Successfully");
    } else {
      throw new Error("Invalid Credential !");
    }
    // const isPasswordValid = await bcrypt.compare(
    //   "Jyoti@166",
    //   "$2b$10$I.evC.YwVz2ZbfWBJ7GJguPkAnBvrSIsVhz1bIr0cLmuCygi7kgtm"
    // );
  } catch (err) {
    res.status(401).send("Error " + err.message);
  }
});

authRouter.post("/logout", async (req, res)=>{
  res.cookie("token", null, {
    expires:new Date(Date.now()),
  });
  res.send("Logout Successfully !"); 
})
module.exports = authRouter;
