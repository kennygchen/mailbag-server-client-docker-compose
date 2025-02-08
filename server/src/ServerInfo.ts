const path = require("path");
const fs = require("fs");

// module that loads environment variables from a .env file
require('dotenv').config()

// Define interface for server information.
export interface IServerInfo {
   smtp: {
      host: string,
      port: number,
      auth: {
         user: string,
         pass: string
      }
   },
   imap: {
      host: string,
      port: number,
      auth: {
         user: string,
         pass: string
      }
   }
}

function getEnvVariable(key: string): string {
   const value = process.env[key];
   if (!value) {
      throw new Error(`Environment variable ${key} is not defined`);
   }
   return value;
}

// The configured server info.
export let serverInfo: IServerInfo;

// Read in the server information file.
const rawInfo: string = fs.readFileSync(path.join(__dirname, "../serverInfo.json"));
serverInfo = JSON.parse(rawInfo);
serverInfo.smtp.auth.user = getEnvVariable("SMTP_USER");
serverInfo.smtp.auth.pass = getEnvVariable("SMTP_PASS");
serverInfo.imap.auth.user = getEnvVariable("IMAP_USER");
serverInfo.imap.auth.pass = getEnvVariable("IMAP_PASS");