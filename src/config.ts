import fs from "fs";
import os from "os";
import path from "path";

const homePath = os.homedir;
const gatorConfigPath = homePath + "/BlogAggregator/gatorconfig.json";

export type Config = {
    dbUrl: string,
    currentUserName: string,
}

export function setUser(username: string) {
    let cfg: Config = readConfig();
    cfg.currentUserName = username;
    
    writeJSON(cfg);
    
}

export function readConfig(): Config {
    let cfgJson = fs.readFileSync(gatorConfigPath,'utf-8');

    let configJson = JSON.parse(cfgJson);

    return configJson;
}

function writeJSON(cfg: Config) {
    let rawConfig = {
        db_url: cfg.dbUrl,
        current_user_name: cfg.currentUserName
    }

    fs.writeFileSync(gatorConfigPath,JSON.stringify(rawConfig));
}

