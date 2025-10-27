import { db } from "..";
import { feeds, users } from "../schema";
import { eq } from "drizzle-orm";

export async function createFeed(feedName: string, feedUrl: string, userId: string) {
    
    const [result] = await db.insert(feeds).values({name: feedName, url: feedUrl, user_id: userId}).returning();

    return result;
}

export async function getFeeds() {
    //get list of all feeds and the associated user from the user table
    const [...result] = await db.select().from(feeds).leftJoin(users, eq(feeds.user_id, users.id));
    
    return result;
}

export async function getFeedIdByName(name: string) {
    const [result] = await db.select({id: feeds.id}).from(feeds).where(eq(feeds.name,name));

    return result;
}

export async function getFeedIdByURL(url: string) {
    const [result] = await db.select({id: feeds.id}).from(feeds).where(eq(feeds.url,url));

    return result;
}

export async function getUserIdByFeedID(feedId: string) {
    const [result] = await db.select({user_id: feeds.user_id}).from(feeds).where(eq(feeds.id,feedId));

    return result;
}


export async function deleteFeeds() {
    await db.delete(feeds);
}