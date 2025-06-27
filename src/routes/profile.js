// create express router
const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");

//To get profile of the user
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  // whenever server gets the profile request. it means user already login so we have to validate the cookie first
  try {
    const user = req.user;

    // if the token is valid, server will response else reply please login/ your cookies got expired
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

// to edit the profile
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  // Do data danitization and data validation ]

  try {
    if (!validateEditProfileData(req)) {
      // profile is not valid means user request to edit not allowed field
      throw new Error("Invalid edit request");
    }
    // after login we already using auth middleware we can get the user who is doing the request
    const loggedInUser = req.user;
    console.log(loggedInUser); // before updated value
    // After validation succesful we have to edit the profile based on request
    // we have to loop over all the keys
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save(); // To save in the DB

    console.log(loggedInUser); // after updated value based on requesr
    res.send(`${loggedInUser.firstName}, your profile Updated Successfully`);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports = profileRouter;
