import fs from "fs";
import { google } from "googleapis";
import readline from "readline";
const OAuth2 = google.auth.OAuth2;
import clientSecrets from "./clientSecret";

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
];

const TOKEN_DIR = "../auth";
const TOKEN_PATH = TOKEN_DIR + "/cridentials.json";

// =======================================================

console.log({ clientSecrets });

const authorize = async () => {
  try {
    // // Authorize a client with the loaded credentials
    // const clientSecret = clientSecrets?.web?.client_secret;
    // const clientId = clientSecrets?.web?.client_id;
    // const redirectUrl = clientSecrets?.web?.redirect_uris[0];
    // const oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);
    // // Check if we have previously stored a token.
    // try {
    //   const token = await readFile(TOKEN_PATH);
    //   oauth2Client.setCredentials(JSON.parse(token));
    //   return oauth2Client;
    // } catch (error) {
    //   console.log("=============> get new token");
    //   return getNewToken(oauth2Client);
    // }
  } catch (error) {
    console.log("Error loading client secret file: " + error);
    return;
  }
};

// ==============================================

const getNewToken = async (oauth2Client) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  console.log("Authorize this app by visiting this url: ", authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("Enter the code from that page here: ", (code) => {
    rl.close();
    oauth2Client.getToken(code, (error, token) => {
      if (error) {
        console.log("Error while trying to retrieve access token", error);
        return;
      }
      oauth2Client.credentials = token;
      storeToken(token);
      console.log(oauth2Client);
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
    console.log("Token stored to " + TOKEN_PATH);
  });
};

// ==============================================

export default authorize;
