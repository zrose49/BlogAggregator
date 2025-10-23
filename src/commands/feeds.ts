import { readConfig } from "src/config";
import { createFeed, deleteFeeds, getFeeds } from "src/lib/db/queries/feeds";
import { getUser, getUserID } from "src/lib/db/queries/users";
import { Feed, feeds, User, users } from "src/lib/db/schema";

export async function addFeed(cmdName:string, feedName: string, url: string) {

const currentUser = readConfig().currentUserName;

if(!currentUser) {
    throw new Error("Current user was not found in the config file!");
}

let userId = await getUserID(currentUser);
let user = await getUser(currentUser);

let feedResult = await createFeed(feedName, url, userId);
if(!feedResult) {
    throw new Error("Failed to create feed");
}

console.log("Feed created successfully!");
printFeed(feedResult,user);

}

function printFeed(feed: Feed, user: User) {
console.log("Feed Info:")
console.log(feed);
console.log("User Info:")
console.log(user);
}

export async function feedCommand(_: string) {


let feeds = await getFeeds();
if(feeds.length === 0) {
    console.log("No feeds found!");
    return;
}
for(const feed of feeds) {
    const user = feed.users;
    if(!user) {
        throw new Error("User doesn't exist!");
    }
    printFeed(feed.feeds,user);
}
}

export async function resetFeeds() {
    await deleteFeeds();
    console.log("Success!");
}