const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZUEwemxZVE4zc0h2c2Fvcko1V2JxelhtRktiWWFwMzB3VGtUYm9tN3RrMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaDFVelRZTnZlak4zZHFEb01DYnp4RlAzK1c1RFJzdHN1d2lLaTRuQkVEcz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2R1prejNEWWlDWnNCeTMyRjNpWmtVZEVEa20xSWFyQnFjSG1XNXFIY21VPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrU0N1QmZacUZHam1MTmN0UUU1ajUvcjUya2R2RUxlWWs2bHpuWWRHTkhNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImdDSVJWcDBTQ0MyWHpwdFp1dDVKczdhc01ZQW1kdUpHaG52d2FzOXAvbDg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlBQdUVOaDRGMkxjb2pFbVBMOC9VcWF1WVkvelk0bC9kcGpLaHZyc3kwVWc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0VPbmpwd1Vpc3NWeHhwOTdlUU1jNlFRS2pRR09jMTVOSU5pNUN1V1dsMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUDRram81V1R3SVJSOHkyRWxya1owaWJ4Z0o4OGVIRDRsL0QrbzlDTmp5cz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1zdTJOcVZwdVJXKzk2eUo5WG5BOHc4dktxTlBtUm92TTRQTlo3eXpVaUJxRGhSeW9heURBUEdTUCtkcFVvMFpIOW9zUFlvWS9Nd1BBSTN0UVhLMWh3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTc1LCJhZHZTZWNyZXRLZXkiOiJIL24xQ2Z1L1JwenlpcUQ0Z1dZc3BpZElVUkdPUDdqK3l3V2E0QmRHajRjPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJKdUpHVkZHSlNleXBmX2pFYmFlNi13IiwicGhvbmVJZCI6IjUyZTc5NGFiLTRjMGMtNGRhNS05OGNkLWMwMGEwYmI1NTE1MiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhV1ExSUZqZTJMY2JwODVMMHpvQjc2dS9HclU9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNXo3SGFwZXdOY2ZBbkFzU1ZNRHE3cTlIWnJJPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkZSRURFWlJBIiwibWUiOnsiaWQiOiIyNTQ3NTg0NDMxMTE6MjRAcy53aGF0c2FwcC5uZXQiLCJsaWQiOiIxMTc0ODA4Mjc2NTgyNTA6MjRAbGlkIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNNTFI4b2tFRU1hVHc4RUdHQTRnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiI4UjdCZ0t4YnZPTjdHbmpTVlhSY05zRTNDekNGbDFoZ21kNThPR2t6UmxjPSIsImFjY291bnRTaWduYXR1cmUiOiI3aElCbi8rU0dpWUNDMVFSRGRtVEZoK3F5UlFpSVZMZElFTnJMbDJUZGJyN3RCRVdhV3dUNkRITms4MmpNZkFCUW0rcUJjOHV3dzhYdXpHSGdmc2pEdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoidHI1QUt1L2RGSTUxdSsvMGNvekJwelk5c3ZQYlpVRzJkZ2RYNk10N2wybVgxWmlyTnNacWFwUzh3NW8rSjBBeTYrN2V3R3pJall2S2Vzenh4a1RkaXc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTQ3NTg0NDMxMTE6MjRAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZkVld1lDc1c3empleHA0MGxWMFhEYkJOd3N3aFpkWVlKbmVmRGhwTTBaWCJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FVSUVnPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQ4MDI3ODU5LCJsYXN0UHJvcEhhc2giOiIyVjc3cVUifQ==',
    PREFIXE: process.env.PREFIX || "*",
    GITHUB : process.env.GITHUB|| 'https://github.com/mr-X-force/LUCKY-MD-XFORCE',
    OWNER_NAME : process.env.OWNER_NAME || "MR ΛĿĿƐИ",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "254758443111",  
              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTO_REACT: process.env.AUTO_REACTION || "non",  
     AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
    URL: process.env.URL || "https://files.catbox.moe/uw4l17.jpeg",  
    URL2: process.env.URL2 || "https://files.catbox.moe/3o37c5.jpeg",
    AUTO_REACT_STATUS: process.env.AUTO_REACT_STATUS || 'yes',              
    CHAT_BOT: process.env.CHAT_BOT || "off",              
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "no",
    AUTO_BLOCK: process.env.AUTO_BLOCK || 'no', 
    GCF: process.env.GROUP_HANDLE || 'no', 
    AUTO_REPLY : process.env.AUTO_REPLY || "no", 
    AUTO_STATUS_TEXT: process.env.AUTO_STATUS_TEXT || 'Your Status Seen By ☢️MR ΛĿĿƐИ☢️',   
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',
    AUTO_BIO: process.env.AUTO_BIO || 'no',       
    ANTI_CALL_TEXT : process.env.ANTI_CALL_TEXT || '',             
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VaihcQv84Om8LP59fO3f",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029VaihcQv84Om8LP59fO3f",
    CAPTION : process.env.CAPTION || "☢️MR ΛĿĿƐИ☢️",
    BOT : process.env.BOT_NAME || '☢️LUCKY-MD-XFORCE☢️⁠',
    MODE: process.env.PUBLIC_MODE || "no",              
    TIMEZONE: process.env.TIMEZONE || "Africa/Dar_Es_Salam", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    ETAT : process.env.PRESENCE || '1',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    FREDI_DELETE : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTI_CALL: process.env.ANTI_CALL || 'yes', 
    AUDIO_REPLY : process.env.AUDIO_REPLY || 'no',             
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, 
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
