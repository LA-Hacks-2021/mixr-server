import express from "express";
import Twilio from "twilio";
import cors from "cors";

import {
  PORT,
  TWILIO_ACCOUNT_SID,
  TWILIO_API_KEY,
  TWILIO_API_SECRET,
} from "./config";
import { checkJwt, checkScopes } from "./auth";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const AccessToken = Twilio.jwt.AccessToken;
const ChatGrant = AccessToken.ChatGrant;

/**
 * Token generation request
 */
app.get("/token/:identity", checkJwt, checkScopes("get:token"), (req, res) => {
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
