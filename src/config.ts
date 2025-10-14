import fs from "fs";
import os from "os";
import path from "path";

export type Config = {
    dbUrl: string,
    currentUserName: string,
}

export function setUser(username: string) {
    let cfg: Config = readConfig();
    console.log(cfg.dbUrl);
    cfg.currentUserName = username;
    
    writeConfig(cfg);
    
}

export function readConfig(): Config {
    const fullPath = getConfigFilePath();
    let cfgJson = fs.readFileSync(fullPath,'utf-8');

    let data = JSON.parse(cfgJson);

    return validateConfig(data);
}

function writeConfig(cfg: Config) {
    const fullPath = getConfigFilePath();
    let rawConfig = {
        db_url: cfg.dbUrl,
        current_user_name: cfg.currentUserName
    }

    let data = JSON.stringify(rawConfig,null,2);
    fs.writeFileSync(fullPath,data,{ encoding: "utf-8" });
}

function validateConfig(rawConfig: any) {
    if(!rawConfig.db_url || typeof rawConfig.db_url !== "string") {
        throw new Error("The field db_url needs to be present in the config file");
    }
    if(!rawConfig.current_user_name || typeof rawConfig.current_user_name !== "string") {
        throw new Error("The field current_user_name needs to be present in the config file");
    }

    const config: Config = {
        dbUrl: rawConfig.db_url,
        currentUserName: rawConfig.current_user_name
    }

    return config;

}

function getConfigFilePath(): string {
    const configFileName = ".gatorconfig.json";
    const homeDir = os.homedir();

    return path.join(homeDir,configFileName);
}
