import { db } from "..";
import { feeds, users } from "../schema";
import { eq } from "drizzle-orm";

export async function createFeed(feedName: string, feedUrl: string, userId: string) {
    try {
    const [result] = await db.insert(feeds).values({name: feedName, url: feedUrl, user_id: userId}).returning();

    return result;
    }
    catch(error) {
        throw error;
    }
}

export async function getFeeds() {
    //get list of all feeds and the associated user from the user table
    const [...result] = await db.select().from(feeds).leftJoin(users, eq(feeds.user_id, users.id));

    return result;
}

export async function deleteFeeds() {
    await db.delete(feeds);
}