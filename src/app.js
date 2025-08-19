const express = require("express");
const app = express();
const connectDB = require("./config/Database");
// const User = require("./models/user");
// const { validateSignUpData } = require("./util/Validation");
// const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
// const { userAuth } = require("./middlewares/auth");

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

//  Get user by email

// app.post("/login", async (req, res) => {
//   try {
//     const { emailId, password } = req.body;
//     const user = await User.findOne({ emailId: emailId });
//     if (!user) {
//       throw new Error("Invalid Credential !");
//     }
//     // const isPasswordValid = await bcrypt.compare(password, user.password);

//     const isPasswordValid = await user.validatePassword(password);

//     if (isPasswordValid) {
//       const token = await user.getJWT();
//       console.log(token);

//       res.cookie("token", token, {
//         expires: new Date(Date.now() + 8 * 3600000)
//       });
//       res.send("Login Successfully");
//     } else {
//       throw new Error("Invalid Credential !");
//     }
//     // const isPasswordValid = await bcrypt.compare(
//     //   "Jyoti@166",
//     //   "$2b$10$I.evC.YwVz2ZbfWBJ7GJguPkAnBvrSIsVhz1bIr0cLmuCygi7kgtm"
//     // );
//   } catch (err) {
//     res.status(401).send("Error " + err.message);
//   }
// });

// app.get("/get", async (req, res) => {
//   const userName = req.body.firstName;
//   const userId = req.body._id;
//   try {
//     const users = await User.findOne({ _id: userId });
//     if (!users) {
//       res.status(401).send("User not Found!");
//     } else {
//       res.send(users);
//     }
//   } catch (err) {
//     res.status(401).send("Something went Wrong!", err.message);
//   }
//   // try {
//   //   const users = await User.findOne({ firstName: userName });
//   //   if (users.length === 0) {
//   //     res.status(404).send("User not Found!");
//   //   }
//   //   res.send(users);
//   // } catch (err) {
//   //   res.status(401).send("Something went Wrong ! please check it...");
//   // }
// });

// Feed API - Get / Feed - get all the userdata from the database

// app.get("/feed", async (req, res) => {
//   try {
//     const users = await User.find({});
//     res.send(users);
//   } catch (err) {
//     res.status(401).send("Something went Wrong!", err.message);
//   }
// });

// app.delete("/delete", async (req, res) => {
//   const userId = req.body._id;
//   try {
//     const users = await User.findByIdAndDelete({ _id: userId });
//     res.send("User Deleted Successfully");
//   } catch (err) {
//     res.status(401).send("Something went Wrong !" + err.message);
//   }
// });

// app.patch("/user/:userId", async (req, res) => {
//   // const userId = req.body._id;
//   const userId = req.params?.userId;
//   const data = req.body;

//   try {
//     const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];

//     const isUpdateAllowed = Object.keys(data).every((k) =>
//       ALLOWED_UPDATES.includes(k)
//     );

//     if (!isUpdateAllowed) {
//       throw new Error("Update not available");
//     }

//     if (data?.skills.length > 10) {
//       throw new Error("Skills Length can not be more than 10 !");
//     }
//     const users = await User.findByIdAndUpdate(userId, data, {
//       returnDocument: "after",
//       runValidators: true,
//     });
//     console.log(users);
//     res.send("User Updated Successfully");
//   } catch (err) {
//     res.status(401).send("Something went Wrong !..." + err.message);
//   }
// });

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
