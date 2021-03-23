import express from "express";
import Twilio from "twilio";

import {
  PORT,
  TWILIO_ACCOUNT_SID,
  TWILIO_API_KEY,
  TWILIO_API_SECRET,
} from "./config.js";

const app = express();
const AccessToken = Twilio.jwt.AccessToken;
const ChatGrant = AccessToken.ChatGrant;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/**
 * Token generation request
 */
app.get("/token/:identity", (req, res) => {
  const identity = req.params.identity;
  const token = new AccessToken(
    TWILIO_ACCOUNT_SID,
    TWILIO_API_KEY,
    TWILIO_API_SECRET
  );

  token.identity = identity;
  token.addGrant(
    new ChatGrant({
      serviceSid: process.env.TWILIO_CHAT_SERVICE_SID,
    })
  );

  res.send({
    identity: token.identity,
    jwt: token.toJwt(),
  });
});

const port = PORT || 5000;
app.listen(port, () => console.log(`Running on port ${port}`));
