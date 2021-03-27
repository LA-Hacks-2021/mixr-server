import express from "express";
import Twilio from "twilio";
import cors from "cors";

import { LinkedInProfileScraper } from 'linkedin-profile-scraper';

import {
  PORT,
  TWILIO_ACCOUNT_SID,
  TWILIO_API_KEY,
  TWILIO_API_SECRET,
  LI_AT_SESSION_COOKIE
} from "./config";

const app = express();
const AccessToken = Twilio.jwt.AccessToken;
const ChatGrant = AccessToken.ChatGrant;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

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

app.get("/li/:username", async (req, res) => {
  const scraper = new LinkedInProfileScraper({
    sessionCookieValue: LI_AT_SESSION_COOKIE,
    keepAlive: false
  });

  // Prepare the scraper
  // Loading it in memory
  await scraper.setup()

  const result = await scraper.run(`https://www.linkedin.com/in/${req.params.username}/`)

  if (result.userProfile.fullName === null) {
    res.status(404).send({"error": "user not found"});
  } else {
    res.send(result);
  }
});

const port = PORT || 5000;
app.listen(port, () => console.log(`Running on port ${port}`));
