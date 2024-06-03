"use server";
import db from "@/app/lib/db";
export async function getMoreTweets(page: number) {
  const tweets = await db.tweet.findMany({
    select: {
      tweet: true,
      id: true,
      created_at: true,
      user: {
        select: {
          username: true,
          email: true,
        },
      },
    },
    skip: page * 1,
    take: 1,
    orderBy: {
      created_at: "desc",
    },
  });
  return tweets;
}
export async function getInitTweets(takeNumber: number) {
  const tweets = await db.tweet.findMany({
    select: {
      tweet: true,
      id: true,
      created_at: true,
      user: {
        select: {
          username: true,
          email: true,
        },
      },
    },
    take: takeNumber,
    orderBy: {
      created_at: "desc",
    },
  });
  return tweets;
  //
}
