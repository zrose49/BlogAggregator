import { createUser, deleteUsers, getAllUsers, getUser } from "src/lib/db/queries/users";
import { readConfig, setUser } from "../config";

export async function handlerLogin(cmdName: string, ...args: string[]) {
    if(args.length < 1) {
        throw new Error(`You must enter a username with the ${cmdName} command`);
    }

    const username = args[0];

    let existingUser = await getUser(username);
    if(!existingUser) {
        throw new Error(`User ${username} does not exist! Please register a user first before attempting to login`);
    }

    setUser(username);
    console.log(`User switched successfully to ${username}`);
}

export async function handlerRegister(cmdName: string, ...args: string[]) {
    if(args.length < 1) {
        throw new Error(`You must enter a name with the ${cmdName} command`);
    }

    let name = args.join('');

    let existingUser = await getUser(name);
        if(existingUser) {
            throw new Error("User already exists!");
        }

    try {    
    let createdUser = await createUser(name);
    console.log(createdUser);
    if(createdUser) {
    setUser(createdUser.name);
    console.log("The user was created!")
    console.log(`The users info is: User Id: ${createdUser.id} User name: ${createdUser.name} 
        Created At: ${createdUser.createdAt} Updated At: ${createdUser.updatedAt}`);
    }
    }
    catch(error) {
        console.error(error,"There was an error creating the user");
    }
}

export async function handlerUsers(_: string) {
    let users = await getAllUsers();
    
    let cfg = readConfig();
    let currentUser = cfg.currentUserName;
    for(let user of users) {
        if(user.name === currentUser) {
        console.log(`${user.name} (current)`);
        }
        else {
            console.log(`${user.name}`);
        }
    }
}

export async function handlerReset(_: string) {
    await deleteUsers();
    console.log("Success!");
}