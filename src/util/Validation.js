const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is not Valid !");
    // }else if(!firstName.length > 4 || firstName.length < 50){
    //     throw new Error("Length Should be 4-50 character")
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Check your EmailId !");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Give Strong Password !");
  }
};
const validateEditProfileData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "emailId",
    "photoUrl",
    "gender",
    "age",
    "about",
    "skills",
  ];

  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );
  return isEditAllowed;
};
module.exports = {
  validateSignUpData,
  validateEditProfileData,
};
