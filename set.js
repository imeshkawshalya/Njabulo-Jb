const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSUtXMmY3ME1XNVJkK2d2aFpOUkJHOUFwNWxiMk9lMFQ4TUN3Qlh0R2QxVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNkx1Sko5ZkU3eFBadHBlaXlySUtpOGprZlFFcW9aMC9oVVJuQlYrcmkyZz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJtQzdnVW50SlpObTNabGh0a3VBa1dJaWRMT1pmM3ZsVVd1ZUxxRDNaMW1BPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJoRkJQYVVYSWxUQktJWitmZkZpelBDcXpBaDRzc2lVMzdsRG9yazQyZGw0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImNNSGd6L3VSbTlmdEszZC9ac0RUVFE1R2ZSQXVzMmtRempJK1l6NEw0Vkk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktNUkcwWkFzM3VqbXBYQkRnWGN6ZExkVnZrdmpEc2VFdVBkc3Nad0NjM3c9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVUw4WTh6YXJuWkVKa1gyZ3IrUTJNeWQycVJXa05lUGV5cXRMOEF3UUFuST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiL0FORmdVT2hUc0NDNnc1K0wrT2RVOTVsN2U2S1VZOWlSMk1vRlNtMllWZz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkkvaWcrOG1HMVhiVU91UHVHRHlWWmtwWnoxMlJ3VEI1WjVnR083b1FQTDMvMVdqbTJIQXF5VUU5R1gxSTg2ZDBVa2c3bzhReFlSVUZ0UUpVQ09QT0J3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjE2LCJhZHZTZWNyZXRLZXkiOiJISE5VTVgrMUdlSGlmMG9FTHFiY09VTjF2OFNacmErV0VQOUNCSCt5MWNjPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJlYmpxa0U0d1NyLVhpUkp3aGNHd3l3IiwicGhvbmVJZCI6IjUwY2FmN2I4LTFiNjUtNDg0Yy1hMjIwLWZhYmQ1MDk2YmRjNSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJaUldraFV3M2d1cWYrRUYrdldHZ0dYa0k5QVE9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZEZtZlRXUUQ4dGlsRXhrUlhuREYzT1ZPdlFzPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6Ilc5NzM5OE03IiwibWUiOnsiaWQiOiI5NDc3ODkxNDk2NDo0N0BzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJLYXZlZSBib3kgT2ZmaWNpYWwifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0pXVjZVVVEwdXZOdXdZWURpQUFLQUE9IiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IjVuR3grS3RNS3FwWExyRWU3NmozUmo3dzY0U3RZWXJIZXhxa3ovV0M2bTg9IiwiYWNjb3VudFNpZ25hdHVyZSI6InpTRmc4SmZKL3JZT0FRenVQMkhRTlNZMXY2Y01WWmRQL1RYQ25pSFloVlFuWkF2QmErVnNIaStiZlNydkQ1ZGE5ZmNpaHRPUWZTMTJHdVlycWlIMUNBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJ6MitmbFpvallINkZPSzd3dXNDK2xoSWJaZnZFR2pGSXdFM1JndUFMWjhaekJwUHpkQkQvcU5XdVZVKzhUNjRiWEc4Tmk2ZDRZa3Fhd1R4NHFLa0NDdz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6Ijk0Nzc4OTE0OTY0OjQ3QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmVaeHNmaXJUQ3FxVnk2eEh1K285MFkrOE91RXJXR0t4M3NhcE0vMWd1cHYifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MzU2MjAwNjMsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBREJvIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Njabulo",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "Njabulo",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
