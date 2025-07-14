const express = require("express");

const app = express();

const connectDB = require("./config/Database");

const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
  // console.log(req.body);
  // const userEmail = newuserMail(lastName:req.body);
  const user = new User(req.body);

  try {
    await user.save();
    res.send("User added Successfully!");
  } catch (err) {
    res.status(400).send("Error!" + err.message);
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
//  Get user by email
app.get("/get", async (req, res) => {
  const userName = req.body.firstName;
  const userId = req.body._id;
  try {
    const users = await User.findOne({ _id: userId });
    if (!users) {
      res.status(401).send("User not Found!");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(401).send("Something went Wrong!", err.message);
  }
  // try {
  //   const users = await User.findOne({ firstName: userName });
  //   if (users.length === 0) {
  //     res.status(404).send("User not Found!");
  //   }
  //   res.send(users);
  // } catch (err) {
  //   res.status(401).send("Something went Wrong ! please check it...");
  // }
});

// Feed API - Get / Feed - get all the userdata from the database

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(401).send("Something went Wrong!", err.message);
  }
});
app.delete("/delete", async (req, res) => {
  const userId = req.body._id;
  try {
    const users = await User.findByIdAndDelete({ _id: userId });
    res.send("User Deleted Successfully");
  } catch (err) {
    res.status(401).send("Something went Wrong !" + err.message);
  }
});

app.patch("/user", async (req, res) => {
  const userId = req.body._id;
  const data = req.body;
  try {
    const users = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators:true,
    });
    console.log(users);
    res.send("User Updated Successfully");
  } catch (err) {
    res.status(401).send("Something went Wrong !..." + err.message);
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
