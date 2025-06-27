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

module.exports = requestRouter;
