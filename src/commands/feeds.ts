import { readConfig } from "src/config";
import { createFeed, deleteFeeds } from "src/lib/db/queries/feeds";
import { getUser, getUserID } from "src/lib/db/queries/users";
import { feeds, users } from "src/lib/db/schema";

export type Feed = typeof feeds.$inferSelect;
export type User = typeof users.$inferSelect;

export async function addFeed(cmdName:string, feedName: string, url: string) {

const currentUser = readConfig().currentUserName;

if(!currentUser) {
    throw new Error("Current user was not found in the config file!");
}

let userId = await getUserID(currentUser);
let user = await getUser(currentUser);
try {
let feedResult = await createFeed(feedName, url, userId);

printFeed(feedResult,user);
}
catch(error) {
    console.error(error);
}

}

function printFeed(feed: Feed, user: User) {
console.log(feed);
console.log(user);
}

export async function resetFeeds() {
    await deleteFeeds();
    console.log("Success!");
}