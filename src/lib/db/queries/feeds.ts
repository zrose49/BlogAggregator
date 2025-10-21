import { db } from "..";
import { feeds } from "../schema";

export async function createFeed(feedName: string, feedUrl: string, userId: string) {
    try {
    const [result] = await db.insert(feeds).values({name: feedName, url: feedUrl, user_id: userId}).returning();

    return result;
    }
    catch(error) {
        throw error;
    }
}

export async function deleteFeeds() {
    await db.delete(feeds);
}