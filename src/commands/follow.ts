import { createFeedFollow } from "src/lib/db/queries/feed_follow";
import { getFeedIdByURL, getFeeds, getUserIdByFeedID } from "src/lib/db/queries/feeds";


export async function followFeed(cmdName: string, url: string) {

const feedId = (await getFeedIdByURL(url)).id;
const userId = (await getUserIdByFeedID(feedId)).user_id;

let result = await createFeedFollow(feedId,userId);

console.log(result);

}