// TO validate the signup data
const validator = require("validator");
// to validate we need the req body (url and its body what we send through POST method in POSTMAN )
const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  } else if (firstName.length < 4 || firstName.length > 50) {
    throw new Error("FirstName should be 4-50 characters");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong password");
  }
};

const validateLoginData = (emailId) => {
  if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid");
  }
};

const validateEditProfileData = (req) => {
  const allowedEditFields = [
    "firstname",
    "lastname",
    "emailId",
    "photoUrl",
    "gender",
    "age",
    "skills",
    "about",
  ];

  // we have to loop the req body(what are sending from request)
  // object.keys will genrally give keys from the request(like age,gender)
  // we are checking that evry field in req body is present in allowed edit fields array. If not present then dont allow to edit
  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );

  return isEditAllowed; // return boolen value true means validation(edit) allowed
};

module.exports = {
  validateSignUpData,
  validateLoginData,
  validateEditProfileData,
};
