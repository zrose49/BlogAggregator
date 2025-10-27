import { db } from "..";
import { feed_follows, feeds, users } from "../schema";
import { eq } from "drizzle-orm";

export async function createFeedFollow(feedId: string, userId: string) {
const [result] = await db.insert(feed_follows).values({user_id: userId, feed_id: feedId}).returning();

const [...query] = await db.select({id: feed_follows.id, createdAt: feed_follows.createdAt, updatedAt: feed_follows.createdAt,
    feedname: feeds.name, username: users.name}).from(feed_follows).innerJoin(feeds, eq(feed_follows.feed_id,feeds.id))
    .innerJoin(users, eq(feed_follows.user_id,users.id));

return query;
}