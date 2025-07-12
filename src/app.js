const express = require("express");

const app = express();

const connectDB = require("./config/Database");

const User = require("./models/user");

app.post("/signup", async(req, res) => {
  const user = new User({
    firstName: "Sachin",
    lastName: "Tendulkar",
    emailID: "sachin10@gmail.com",
    password: "sachin@10",
  });

  try {
  await user.save();
  res.send("User added Successfully!"); 
  } catch(err){
    res.status(400).send("Error!")
  }
});

connectDB()
  .then(() => {
    console.log("DB Connected Successfully!");
    app.listen(5555, () => {
      console.log("Server is Successfully Working");
    });
  })
  .catch((err) => {
    console.error("DB is not Connected");
  });
