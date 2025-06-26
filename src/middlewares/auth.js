const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  //! JOB OF AUTH MIDDLEWARE
  //1. Read the token from the req cookies
  //2. Validate the token
  //3. Find the user
  try {
    const cookies = req.cookies;
    const { token } = cookies;
    if (!token) {
      throw new Error("Token is not valid!!!");
    }
    const decodedMessage = await jwt.verify(token, "DEV@Tinder$250");
    const { _id } = decodedMessage;

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user; // we are adding the find out user to the req becasue we dont want to find it again inside the request handler
    // Why next is called? To move to the request handler, after we verified and get the user who logged in we have to move the request handler requested from the user (/profile means go to profile API request handler)
    next();
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};

module.exports = {
  userAuth,
};
