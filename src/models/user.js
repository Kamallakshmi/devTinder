const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
  },
  gender: {
    type: String,
    validate(value) {
      if (!["male", "female", "others"].includes(value)) {
        throw new Error("Gender is not valid");
      }
    },
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
  photoUrl: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  },
  about: {
    type: String,
    default: "This is the default about of the user ",
  },
  skills: {
    type: [String],
  },
});
// model name starts with captial letter becuase it is kind of class
const User = mongoose.model("User", userSchema);
module.exports = User;
