import { setUser } from "../config";

export async function handlerLogin(cmdName: string, ...args: string[]) {
    if(args.length < 1) {
        throw new Error("You must enter a username with the login command");
    }

    let username = args.join('');
    setUser(username);
    console.log("User has been set");
}