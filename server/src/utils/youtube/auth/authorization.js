const fs = require("fs");
const util = require("util");
const { google } = require("googleapis");
const readline = require("readline");
const OAuth2 = google.auth.OAuth2;

// =======================================================

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/upload_app_session.json
const SCOPES = [
  "https://www.googleapis.com/auth/youtube",
  "https://www.googleapis.com/auth/youtube.force-ssl",
  "https://www.googleapis.com/auth/youtube.readonly",
  "https://www.googleapis.com/auth/youtube.upload",
  "https://www.googleapis.com/auth/youtubepartner",
  "https://www.googleapis.com/auth/youtubepartner-channel-audit",
  // "https://www.googleapis.com/youtube/v3/liveBroadcasts",
];

const TOKEN_DIR = "../auth";
const TOKEN_PATH = TOKEN_DIR + "/cridentials.json";

// =======================================================

const authorize = async () => {
  const readFile = util.promisify(fs.readFile);
  try {
    const content = await readFile(TOKEN_DIR + "/client_secret.json");

    // Authorize a client with the loaded credentials
    const credentials = JSON.parse(content);
    const clientSecret = credentials.web.client_secret;
    const clientId = credentials.web.client_id;
    const redirectUrl = credentials.web.redirect_uris[0];
    const oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);

    // Check if we have previously stored a token.
    try {
      const token = await readFile(TOKEN_PATH);

      oauth2Client.setCredentials(JSON.parse(token));

      return oauth2Client;
    } catch (error) {
      return getNewToken(oauth2Client);
    }
  } catch (error) {
    console.error("Error loading client secret file: " + error);
    return;
  }
};

// ==============================================

const getNewToken = async (oauth2Client) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  console.log(authUrl);
  console.dir("Authorize this app by visiting this url: ", authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("Enter the code from that page here: ", (code) => {
    rl.close();
    oauth2Client.getToken(code, (error, token) => {
      if (error) {
        return;
      }
      oauth2Client.credentials = token;
      storeToken(token);
    });
  });
};

// ==============================================

const storeToken = (token) => {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (error) {
    if (error.code != "EEXIST") {
      throw error;
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token), (error) => {
    if (error) throw error;
  });
};

// ==============================================

module.exports = authorize;
