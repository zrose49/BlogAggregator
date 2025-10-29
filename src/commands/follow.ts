import { readConfig } from "src/config";
import { createFeedFollow } from "src/lib/db/queries/feed_follow";
import { getFeedIdByURL, getFeeds, getUserIdByFeedID } from "src/lib/db/queries/feeds";
import { getUser } from "src/lib/db/queries/users";


export async function followFeed(cmdName: string, url: string) {

const feedId = (await getFeedIdByURL(url)).id;
const currentUser = readConfig().currentUserName;
const userId = (await getUser(currentUser)).id;

let result = await createFeedFollow(feedId,userId);

console.log(result);

}