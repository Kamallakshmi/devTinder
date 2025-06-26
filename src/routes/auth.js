// create express router
const express = require("express");
const authRouter = express.Router();
const {
  validateSignUpData,
  validateLoginData,
} = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");

//! authRouter.get is same as app.get
// Use POST method to add data into DB
// To register the new user into DB
authRouter.post("/signup", async (req, res) => {
  try {
    // First thing is validation of data
    // Create a helper function to do this validation
    validateSignUpData(req);

    // second thing Encrypt the password then store the data into DB
    const { firstName, lastName, emailId, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    // creating a new instance(user) of the User model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    // saving the instance into DB.
    // Always try to put DB activity when saving put inside try catch block

    await user.save();
    res.send("User Added  successfully");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

//Login API
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    // validation for email id // do sanitization for email id - to check whether user give proper format of mail id
    validateLoginData(emailId);

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      // Create a JWT token
      const token = await user.getJWT();

      /// Add the token to cookies and send the response back to  the user
      res.cookie("token", token);
      res.send("Login Succesful");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports = authRouter;
