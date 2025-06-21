// start point of the project
const express = require("express");

const app = express(); // creating instance of expressjs application(server)

//! ORDER OF ROUTES IS MATTER
// app.use("/", (req, res) => {
//    this is "/" will override "/test" so even we check localhost:3000/test it will give response as "Hello from Server"
//    this "/test" is the path now server listen only specific to "3000/test"
//   res.send("Hello from the Server"); // this respond will send to the requesting browser and display the message on the browser as response
// });

// this will only handle GET call to /test
app.get("/user", (req, res) => {
  res.send({ firstName: "Kamal", lastName: "Ramesh" });
});

app.post("/user", (req, res) => {
  // Saving data to DB
  res.send("Data successfully saved to the database");
});
app.delete("/user", (req, res) => {
  // Saving data to DB
  res.send("Deleted Successfully");
});

// this will match all the HTTP method API calls to /test
// we have to handle the request which comes to server port 3000 and do response - USE METHOD
// the function which we are passing as parameter inside use method is called REQUEST HANDLER FUNCTION
// This is called API's we could say dummy API -- requesting the server and geting the response
app.use("/test", (req, res) => {
  // this "/test" is the path now server listen only specific to "3000/test"
  res.send("Hello from the Server from test path"); // this respond will send to the requesting browser and display the message on the browser as response
});

app.use("/", (req, res) => {
  // will the sequence matter YESSS!! now if the request localhost:3000/test server will response "Hello from the Server from test path" becasue "\test" comes before "\"
  // this "/test" is the path now server listen only specific to "3000/test"
  res.send("Hello from the Server"); // this respond will send to the requesting browser and display the message on the browser as response
});

// after creating server we have to listen to particular port for incoming request - LISTEN METHOD
app.listen(3000, () => {
  console.log("Server is succesfully listening on port 3000");
});
