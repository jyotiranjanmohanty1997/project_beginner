const express = require("express");

const app = express();

const {adminAuth, userAuth} = require("./middlewares/auth");
// const connectDB = require("./config/Database");

app.use("/admin", adminAuth);
app.use("/user", userAuth);

app.get("/user",userAuth, (req, res)=>{
  console.log("UserData Added Successfully");
  res.send("UserData sent Successfully!...");
})

app.get("/adminAuth/getUser", (req, res)=>{
  console.log("UserData Added Successfully");
  res.send("Admin Data sent Successfully!...");
})

app.get("/adminAuth/deleteUser", (req, res)=>{
  console.log("Deleted Successfully");
  res.send("Admin Data Deleted Successfully!...");
})

app.listen(5555, () => {
  console.log("Server is Successfully Working");
});


// connectDB()
//   .then(() => {
//     console.log("DB Connected Successfully!");
//   })
//   .catch((err) => {
//     console.error("DB is not Connected");
//   });

// app.use("/home", (req, res) => {
//   res.send("Welcome");
// });
// app.use("/", (req, res) => {
//   res.send("Hello");
// });

// app.get(
//   "/user",
//   (req, res, next) => {
//     console.log("1st User Routes");
//     res.send("1st Responses");
//     next();
//   },
//   (req, res, next) => {
//     console.log("2nd User Routes");
//     // res.send("2nd Responses");
//     next();
//   },
//   (req, res, next) => {
//     console.log("3rd user Routes");
//     // res.send("3rd Responses");
//     next();
//   },
//   (req, res, next) => {
//     console.log("4th user Routes");
//     // res.send("4th Responses");
//   }
// );

// app.all("/home/add", (req, res)=>{
//   console.log("Welcome To Home");
//   res.send("Home1");
// })  // both are same but it accept only the correct path.
// app.use("/home/add", (req, res)=>{
//   console.log("Welcome To Home");
//   res.send("Home2");
// })  // it accept right-path with / anything

// app.get("/adminAuth", (req, res, next)=>{
//   const token= "XYZabc";
//   const isAdminAuthorized = token ==="XYZ"
//   console.log("Admin Data sent Successfully!");
//   if(!isAdminAuthorized){
//   //     res.send("Admindata Added Successfully!");
//   // }else{
//     res.status(401).send("UnAuthorized Request");
//   }else{
//     next();
//   }
// })
// app.get("/user", (req, res)=>{
//   console.log("UserData Added Successfully");
//   res.send("Admin Data Added Successfully!...");
// })

// app.get("/adminAuth/getUser", (req, res)=>{
//   console.log("UserData Added Successfully");
//   res.send("Admin Data Added Successfully!...");
// })

// app.get("/adminAuth/deleteUser", (req, res)=>{
//   console.log("Deleted Successfully");
//   res.send("Admin Data Deleted Successfully!...");
// })

// app.listen(5555, () => {
//   console.log("Server is Successfully Working");
// });
