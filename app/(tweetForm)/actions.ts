"use server";
import { z } from "zod";
import db from "../lib/db";
import getSession from "../lib/sessions";
import { redirect } from "next/navigation";

const TweetSchema = z.object({
  TweetMsg: z.string({ required_error: "tweet is required!" }).min(5).max(100),
});

export async function uploadTweet(_: any, formData: FormData) {
  const data = {
    TweetMsg: formData.get("TweetMsg"),
  };

  const results = TweetSchema.safeParse(data);

  if (!results.success) {
    return results.error.flatten();
  } else {
    const session = await getSession();
    if (session.id) {
      const tweetResult = await db.tweet.create({
        data: {
          tweet: results.data.TweetMsg,
          user: {
            connect: {
              id: session.id,
            },
          },
        },
        select: {
          id: true,
        },
      });
      redirect("/");
    }
  }
  //console.log(data);
}
