// start point of the project
const express = require("express");
const connectDB = require("./config/database");

const app = express(); // creating instance of expressjs application(server)
const User = require("./models/user");

// middleware to convert json to js object
app.use(express.json());

// Use POST method to add data into DB
app.post("/signup", async (req, res) => {
  console.log(req.body);
  // creating a new instance(user) of the User model
  const user = new User(req.body);
  // saving the instance into DB.
  // Always try to put DB activity when saving put inside try catch block
  try {
    await user.save();
    res.send("User Added  successfully");
  } catch (err) {
    res.status(400).send("Error saving the user:" + err.message);
  }
});

// Get user by email
// whenevr we areusing db operation always use async/await becasue all the dp methods will return a promise
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    // we have to use the method along with proper model. now get the email of user
    const user = await User.find({ emailId: userEmail });
    if (user.length === 0) {
      res.status(400).send("Something went wrong");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// To delete the instances in the DB
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;

  try {
    // we have to use the method along with proper model. now get the email of user
    const user = await User.findByIdAndDelete(userId);
    res.send("User deleted successfully");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// To update the user instance in the DB
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = [
      "userId",
      "photoUrl",
      "about",
      "gender",
      "age",
      "skills",
    ];

    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );

    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }
    await User.findByIdAndUpdate({ _id: userId }, data);
    res.send("User Updated Successfully");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// Feed API - GET /feed - get all the users from the database
app.get("/feed", async (req, res) => {
  try {
    // we have to use the method along with proper model. now get all of user so no passing any filters
    const user = await User.find({});
    if (user.length === 0) {
      res.status(400).send("Something went wrong");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

connectDB()
  .then(() => {
    console.log("Database connection is established");
    app.listen(3000, () => {
      console.log("Server is succesfully listening on port 3000");
    });
  })
  .catch((err) => {
    console.log("Database cannot be connected");
  });

//! ORDER OF ROUTES IS MATTER
// app.use("/", (req, res) => {
//    this is "/" will override "/test" so even we check localhost:3000/test it will give response as "Hello from Server"
//    this "/test" is the path now server listen only specific to "3000/test"
//   res.send("Hello from the Server"); // this respond will send to the requesting browser and display the message on the browser as response
// });

// this will only handle GET call to /test
// app.get("/user", (req, res) => {
//   res.send({ firstName: "Kamal", lastName: "Ramesh" });
// });

// app.post("/user", (req, res) => {
//   // Saving data to DB
//   res.send("Data successfully saved to the database");
// });
// app.delete("/user", (req, res) => {
//   // Saving data to DB
//   res.send("Deleted Successfully");
// });

// // this will match all the HTTP method API calls to /test
// // we have to handle the request which comes to server port 3000 and do response - USE METHOD
// // the function which we are passing as parameter inside use method is called REQUEST HANDLER FUNCTION
// // This is called API's we could say dummy API -- requesting the server and geting the response
// app.use("/test", (req, res) => {
//   // this "/test" is the path now server listen only specific to "3000/test"
//   res.send("Hello from the Server from test path"); // this respond will send to the requesting browser and display the message on the browser as response
// });

// app.use("/", (req, res) => {
//   // will the sequence matter YESSS!! now if the request localhost:3000/test server will response "Hello from the Server from test path" becasue "\test" comes before "\"
//   // this "/test" is the path now server listen only specific to "3000/test"
//   res.send("Hello from the Server"); // this respond will send to the requesting browser and display the message on the browser as response
// });

// after creating server we have to listen to particular port for incoming request - LISTEN METHOD
