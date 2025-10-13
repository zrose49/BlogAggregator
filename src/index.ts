import { readConfig, setUser } from "./config";

function main() {
    setUser("Zachary");
    console.log(readConfig());
}

main();