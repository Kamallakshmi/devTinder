// start point of the project
const express = require("express");

const app = express(); // creating instance of expressjs application(server)

// we have to handle the request which comes to server port 3000 and do response - USE METHOD
// the function which we are passing as parameter inside use method is called REQUEST HANDLER FUNCTION
// This is called API's we could say dummy API -- requesting the server and geting the response
app.use("/test", (req, res) => {
  // this "/test" is the path now server listen only specific to "3000/test"
  res.send("Hello from the Server"); // this respond will send to the requesting browser and display the message on the browser as response
});

// after creating server we have to listen to particular port for incoming request - LISTEN METHOD
app.listen(3000, () => {
  console.log("Server is succesfully listening on port 3000");
});
