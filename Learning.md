-- Create a repository
-- Intialize the repository
-- node_modules, package.json, package-lock.json
-- Install express
-- Create a server
-- Listen to port 3000
-- Write request handler for /test, /hello
-- Install nodemon and update scripts inside package.json

-- Initialize git
-- .gitignore
-- Create a remote repo on github
-- Push all code to remote origin.

-- Install Postman APP and make workspace/collection and test API call
-- write logic to handle GET, POST, DELETE in POSTMAN
-- Explore routing and use of ?, +, (), * in the routes
-- Use of regex in routes /a/ , /.*fly$/
-- Reading the query params in the routes
-- Reading the dynamic routes

-- Multiple Route Handlers - Play with code
-- next()
-- next function and errors along with res.send()
-- app.use("/route", rH, [rH2, rH3], rH4, rH5);
-- What is Middlewares?
-- why is Middlewares important(Auth comes into picture for admin page)
-- Error Handling using app.use("/",(err, req, res, next) = {});

-- Create a free cluster on mongoDB website
-- install mongoose lib
-- connect your application to the database(/devTinder)
-- call connectDB funciton and connect to database before starting application on port 3000
-- Create a userSchema and userModel
-- create POST /signup API to add data to database
-- Push some documents(instance) using API calls from postman

-- JS object vs JSON (difference)
-- add the express.json middleware to your app
-- Make your sigup API dynamic to recieve data from the end user
-- API - Get user by email
-- API - Feed API - GET /feed - get all the users from the database.
-- API - Update the user

-- Explore schemetypes option from the document
-- create a custom validation
-- API level validation for PATCH request
-- DATA SANITIZATION - Add API validation for each field
-- Install validator
-- Explore validator library function

-- validate data in signup API(use helper function)
-- Install bcrypt package
-- Create PasswordHash using bcrypt.hash and save the encrypted password
-- Create login API
-- compare password and throw error if email or password in invalid

-- Install cookie-parser
-- just send a dummmy cookie to user
-- create GET / profile API and check if you get the cookies back
-- Install jsonwebtoken
-- in login api, after email and password validation, create a JWT token and send it to user inside cookies
-- read the cookies inside your profile API and find the looges in user
-- userAuth middleware
-- add the userAuth middleware in profile API and a new sendConnectionRequest API
-- Set the expiry of JWT token and cookies to 7 days
-- Create UserSchema method to comparepassword(passwordinputby user from request)

-- Explore tinder APIs
-- Create a list all APIs
-- Group mutiple routes under respective routes
-- Read documentation for express.Router
-- Create routes folder for managing auth, profile, request routers
-- create authRouter, profileRouter, reuqestRouter
-- Import these routers in app.js
-- Create POST /logout API
-- Create PATCH /profile/edit
-- Create PATCH /profile/password API => forgot password API
-- Make sure to validate all data in every POST, PATCH API's

-- Create aconnection request Schema
-- send Connection request Api
-- proper validation of data
-- think about all corner cases
-- $OR and $AND query in mongoDB [ logical queries ]
-- schema.pre("save") functions
-- Read more about indexes in MongoDB
-- why do we need index? what is adv and disadv of creating a index?
--
