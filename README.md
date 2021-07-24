# mixr-server

Mixr app backend server.

## Setup

1. Clone the repo using `git clone https://github.com/LA-Hacks-2021/mixr-server.git`
2. Run `npm install` in root directory
3. For development, run `npm run dev`. This enable hot-reloading on code changes. For production, run `npm start`

### What's working right now:

Run `npm start`, then run `lt --subdomain mixr-server --port 5000`. Make sure you have added the `LI_IN_SESSION_COOKIE` in the `.env` file. Hot-reloading will not work. Then, log in and don't include `https:/linkedin.com/in`. Only include what comes after.

## API Endpoints

### Get Twilio token

- Method: GET
- URL: `/token/:identity`
- Params:
  - Identity: unique identifier for user (linkedin email in this case)

### Get Linkedin Profile

This scrapes user's LI profile, adds it to the firestore database, and then returns it.

- Method: GET
- URL: `/li/:username`
- Parms:
  - Username: linkedin vanity name (end of url)
- Returns:
  - 404: Linkedin profile not found
  - 200: Returns full profile as json (view example response [here](https://github.com/jvandenaardweg/linkedin-profile-scraper#example-response))

## env file

Twilio API needs a .env file with the following fields. These can be found in the Twilio console.
Google firebase also needs a private key. You can follow the instructions [here](https://cloud.google.com/docs/authentication/production#create_service_account), and add the key path to your .env file.  
Lastly, the LinkedIn Scraper needs a session cookie. You can get this by logging in to LinkedIn and getting the "li_at" cokkie value.

```env
# Required for all uses
TWILIO_ACCOUNT_SID=XX
TWILIO_API_KEY=XX
TWILIO_API_SECRET=XX

# Required for Chat
TWILIO_CHAT_SERVICE_SID=XX

# Required for Notify
# TWILIO_NOTIFICATION_SERVICE_SID=XX

# Optional for Sync. By default, the app uses the 'default' instance on your account.
# TWILIO_SYNC_SERVICE_SID=XX

# Firebase Service Account
# Download Private Key (.json file) and point to it here
GOOGLE_APPLICATION_CREDENTIALS=.path/to/mixr-xxxxxxxxx.json

# LinkedIn Session Cookie for Scraping
LI_AT_SESSION_COOKIE=XX
```

## ESLint and Prettier

Eslint and prettier are installed for this project. Their settings can be found in .eslintrc and .prettierrc respectively. You can install the eslint and prettier plugins for vscode to integrate with them.
