# mixr-server

Mixr app backend server.

## Setup

1. Clone the repo using `git clone https://github.com/LA-Hacks-2021/mixr-server.git`
2. Run `npm install` in root directory
3. For development, run `npm run dev`. This enable hot-reloading on code changes. For production, run `npm start`

## API Endpoints

> API endpoints require an Auth0 token (received from Auth0 after login) to be included in the headers of the request under `authorization`. The Auth0 token should have the appropriate Auth0 scopes for the relevant endpoints. For more details, refer to <https://auth0.com/docs/scopes>.

### Get Twilio token

- Method: GET
- URL: `/token/:identity`
- Params:
  - Identity: unique identifier for user (linkedin email in this case)
- Auth0 Scopes:
  - `"get:token"`

## env file

Twilio API needs a .env file with the following fields. These can be found in the Twilio console.

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
```

## ESLint and Prettier

Eslint and prettier are installed for this project. Their settings can be found in .eslintrc and .prettierrc respectively. You can install the eslint and prettier plugins for vscode to integrate with them.
