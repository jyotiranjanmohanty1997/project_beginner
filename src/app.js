const express = require("express");

const app = express();
const port = 5888;

app.get("/home", (req, res) => {
  res.send("Welcome");
});

app.get("/about", (req,res)=>{
    res.send("About Page");
})

app.listen(port, () => {
  console.log("Successfully Working");
});
