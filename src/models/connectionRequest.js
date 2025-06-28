const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    // to send a connection request we need sender id and receiver id
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // reference to the user collection
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: `{VALUE} is incorrect status type`,
      }, // create enum to restrict user for some values. here status is restricted to only 4 things Status: ignore, interested, accepted, rejected
    },
  },
  {
    timestamps: true, // to say when the sender sent a connection request.
  }
);

// connectionRequest.find({ fromUserId: 28384747383849, toUserId: 2938484839399})// compound index
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 }); // 1 means asc and -1 means desc order

// This pre will called before save the connection request
connectionRequestSchema.pre("save", function (next) {
  const connectionRequest = this;
  // check if the fromUserId is same as toUserId
  // we cant directly compare from user id and to user id becasue they are not string so we parse using connectionRequest.fromUserId
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("Cannot send connection request to yourself!");
  }
  next(); // this is middleware so we call next()
});

const ConnectionRequestModel = new mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema
);
module.exports = ConnectionRequestModel;
