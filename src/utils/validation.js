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

module.exports = {
  validateSignUpData,
  validateLoginData,
};
