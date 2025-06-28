# DevTinder APIs

## 1.authRouter

- POST /signup
- POST /login
- POST /logout

## 2.profileRouter

- GET /profile/view
- PATCH /profile/edit (updating the profile)
- PATCH /profile/password (update password)

Status: ignore(user ignore profile of others - LEFT SWIPE(call ignore API)), interested (user interested profile of others - RIGHT SWIPE(call interested API)), accepted, rejected

## 3.connectionRequestRouter

SENDING THE CONNECTION REQUEST

- POST /request/send/:status/:userId // status can be ignored and interested so make dynamic

  RECEIVING THE CONNECTION REQUEST(to accept and reject it)

- POST /request/review/:status/:requestId // Status can be accept or reject from receiver end

## 4.userRouter

TO GET MATCHING PROFILE

- GET /user/connections
  TO GET CONNECTIONS RECIEVED
- GET /user/request/received/:requestId
  To GET FEED OF OTHER USERS IN HOMEPAGE
- GET /user/feed
