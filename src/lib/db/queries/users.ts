import { db } from "..";
import { users } from "../schema";
import { eq } from "drizzle-orm";

export async function createUser(name: string) {
  try {
  const [result] = await db.insert(users).values({ name: name }).returning();
  return result;
  }
  catch(error) {
    console.error("Error creating user!");
  }
}

export async function getUser(name: string) {
  try {
    const [result] = await db.select().from(users).where(eq(users.name,name));
    return result;
  }
  catch(error) {
    throw new Error("There was an error retrieving the User");
  }
}

export async function getUserID(name: string) {
  try {
    const [result] = await db.select({id: users.id}).from(users).where(eq(users.name,name));
    return result.id;
  }
  catch(error) {
    throw new Error("There was an error retrieving the User ID");
  }
}

export async function getAllUsers() {
  const [...result] = await db.select({name: users.name}).from(users);
  return result;
}

export async function deleteUsers() {
  await db.delete(users);
}