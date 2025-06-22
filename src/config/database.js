const mongoose = require("mongoose");

const connectDB = async () => {
  // To connect Nodejs application with MongoDB cluster. Mangoose.connect will return a promise
  await mongoose.connect(
    "mongodb+srv://kamalramesh:LsPAYgtLFu00OUKJ@namastenode.1ymj4ht.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
