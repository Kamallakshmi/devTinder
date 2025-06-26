const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");

//TO send a connection request
requestRouter.post(
  "/sendConnectionRequest",
  userAuth,
  async (req, res, next) => {
    try {
      const user = req.user;
      console.log("Sending a connection request");
      res.send(`${user.firstName} sent the connection request`);
    } catch (err) {
      res.status(500).send("Something went wrong");
    }
  }
);

module.exports = requestRouter;
