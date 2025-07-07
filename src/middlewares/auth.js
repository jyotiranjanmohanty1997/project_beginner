const adminAuth = (req, res, next) => {
  const token = "XYZabc";
  const isAdminAuthorized = token === "XYZ";
  console.log("Admin Data sent Successfully!");
  if (!isAdminAuthorized) {
    //     res.send("Admindata Added Successfully!");
    // }else{
    res.status(401).send("UnAuthorized Request");
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
  const token = "XYZabc";
  const isUserAuthorized = token === "XYZ";
  console.log("UserData sent Successfully!");
  if (!isUserAuthorized) {
    //     res.send("Admindata Added Successfully!");
    // }else{
    res.status(401).send("UnAuthorized Request");
  } else {
    next();
  }
};

module.exports = { adminAuth, userAuth };
