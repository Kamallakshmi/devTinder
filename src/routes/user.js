const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const userRouter = express.Router();

const USER_SAFE_DATA = "firstName lastname age skills photoUrl";
// Get all the pending connection request for the loggedinInUser
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequest = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", USER_SAFE_DATA); // in populate "fromUserId" is the reference and pass the list of data we need from that (fname and lname )

    res.json({
      messsage: "Data fetched successfully!",
      data: connectionRequest,
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

userRouter.get("/user/requests/connected", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    // how to fetch the loggedinuser all the connections (connection means if pant sents a request to sachin and he accept it means both have 1 connection)
    // 1. check the status is accepted
    //2. query either fromUSer or toUser

    const connectionRequest = await ConnectionRequest.find({
      $or: [
        // finding out all the connection requests fromuser or touser is accepted
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);
    // to show only info about from user
    const data = connectionRequest.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });

    res.json({ data });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    //User should see all the user cards except 1. His own card, 2. His connections(already accepted), 3. Ignored People 4. Already sent the connection request.
    //Example: Rahul, Kamal, Elon, Mark, Donald, Dhoni, Virat
    // What could rahul see on his feed now if he is new user ? - except rahul everyone
    // what rahul sent connection request to kamal and Elon ? -- except rahul, kamal, Elon
    // what if kamal rejected the request ? -- except rahul, kamal, Elon
    // what if elon accepted the request ? -- except rahul, kamal, Elon [so basically if the entry into connectionrequest then dont get into th feed]

    // find loggedin user
    const loggedInUser = req.user;
    // if the page number and limit not passed we assumes those to be 1 and 10
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;

    // calculate the skip. skip formula = (page - 1)* limit
    const skip = (page - 1) * limit;

    // find out all the connection request wheter sent or recieved becasue those things should not in the feed
    const connectionRequest = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserid: loggedInUser._id }],
    }).select("fromUserId toUserId"); // these are the people dont want in my feed

    const hideUsersFromFeed = new Set(); // set always contain unique values dont store any duplicate
    // Set going to contains the users we are going to hide from the feed.
    connectionRequest.forEach((req) => {
      // we are pushing from and to user id in connection request to the set
      hideUsersFromFeed.add(req.fromUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString());
    });

    //to find out the remaining users to show in the feed
    const users = await User.find({
      // making a db call to find all the users whos id is not present in hide user array
      // nin means not in the array(hideUsersFromFeed)
      // ne means not equal to loggedin user ( we should not feed the loged in user itself in the feed)
      $and: [
        {
          _id: {
            $nin: Array.from(hideUsersFromFeed),
          },
        },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select(USER_SAFE_DATA)
      .skip(skip)
      .limit(limit); // to hide password and other details we choosing what to show

    res.send(users);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = userRouter;
