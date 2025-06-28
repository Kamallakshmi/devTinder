const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

//TO send a connection request
requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res, next) => {
    try {
      const fromUserId = req.user._id; // loggedin user details
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      // make the api dynamic but only either ignored or interested
      const allowedStatus = ["ignored", "interested"];
      if (!allowedStatus.includes(status)) {
        return res
          .status(400)
          .json({ message: "Invalid status type: " + status });
      }

      // in send request if the requested id is not found in DB
      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(400).json({ message: "User not found" });
      }

      // if there is an already connectionRequest exist (it will leadts to duplication creation of instance at schema level)
      // use index query to search optimization to find any one already exist
      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          // if the from and to user id already exist or to user id sending reques backt to from userid, when from userid already gave request to to userId we should not allow
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId }, // here use compund index -- when query both index field at same time
        ],
      });

      if (existingConnectionRequest) {
        return res.status(400).send({
          message: "Connection Request Already Exists!!",
        });
      }

      // After we got all we have to save the connection request as new instance of connectionRequestModel
      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();
      res.json({
        // equal to res.send()
        message: req.user.firstName + " " + status + " " + toUser.firstName,
        data,
      });
    } catch (err) {
      res.status(400).send("ERROR: " + err.message);
    }
  }
);

// we need userAuth to make sure user as logged in(check token is valid or not, then findout logged in user from DB and call the next request handler)
requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      // Pant is sending request to sachin
      // wha thing we need to check?
      //1. toUserId(sachin) should have to logged in ( he only going to accept or reject).(validate the usedId)
      //2. check status should be interested.(validate the status)
      //3. check requestId should be valid(means it should be in DB)
      const loggedInUser = req.user; // taking the user from requesting body
      const { status, requestId } = req.params; // taking the status from req body

      const allowedStatus = ["accepted", "rejected"]; // validation of status
      if (!allowedStatus.includes(status)) {
        // checking the status coming in the request is present in allowedStatus array
        return res.status(400).json({ message: "Status is not allowed!" });
      }

      const connectionRequest = await ConnectionRequest.findOne({
        // once the status is correct then check requesting Id is present in DB or not
        _id: requestId,
        toUserId: loggedInUser.id, // the connection request toUserId should be same as loggically the loggedIn user id bcz then only he can accept or reject the request
        status: "interested",
      });

      if (!connectionRequest) {
        // if that connectionRequest not found in DB then throw error
        return res
          .status(400)
          .json({ message: "Connection request is not found!" });
      }
      // if everything perfect then we have to save the status
      // connectionRequest.interested = accepted/rejected based on incoming request body(url in postman)
      connectionRequest.status = status;
      const data = await connectionRequest.save();
      res.json({ message: "Connection request " + status, data });
    } catch (err) {
      res.status(400).send("ERROR: " + err.message);
    }
  }
);

module.exports = requestRouter;
