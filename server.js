require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 4000;
const jwt = require("jsonwebtoken");
const Scaledrone = require("scaledrone-node-push");
CHANNEL_ID = process.env.CHANNEL_ID;
CHANNEL_SECRET = process.env.SECRET_KEY;

const sd = new Scaledrone({
  channelId: CHANNEL_ID,
  secretKey: CHANNEL_SECRET
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.post("/auth", function(req, res) {
  const { body } = req;
  const userId = body.user.clientId;
  if (hasChannelAccess(userId)) {
    const payload = {
      client: body.user.clientId,
      channel: CHANNEL_ID,
      permissions: {
        "^live-votes$": {
          publish: false,
          subscribe: true
        }
      },
      exp: Math.floor(Date.now() / 1000) + 60 * 3 // client has to use this token within 3 minutes
    };
    const token = jwt.sign(payload, CHANNEL_SECRET, { algorithm: "HS256" });
    res.status(200).end(token);
  } else {
    res.status(403).end("Sorry! You are not allowed.");
  }
});
function hasChannelAccess(req) {
  // Your should implement your own authentication code here.
  // You could query your user from your database and see if they are allowed to
  // connect or give them user-scoped access using JWT permissions
  return true;
}

app.post("/vote", (req, res) => {
  const { body } = req;
  const room = "live-votes";
  const response = { playerId: body.vote.player_id };
  const message = response.playerId;
  sd.publish(room, message, error => {
    if (error) {
      console.log(error);
    } else {
      res.json({
        player_id: body
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
