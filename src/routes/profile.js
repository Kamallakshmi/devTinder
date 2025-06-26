// create express router
const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");

//To get profile of the user
profileRouter.get("/profile", userAuth, async (req, res) => {
  // whenever server gets the profile request. it means user already login so we have to validate the cookie first
  try {
    const user = req.user;

    // if the token is valid, server will response else reply please login/ your cookies got expired
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports = profileRouter;
