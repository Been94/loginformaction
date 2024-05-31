import db from "@/app/lib/db";
import getSession from "@/app/lib/sessions";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";
import TweetList from "@/app/components/TweetList";

async function getInitTweets() {
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
    take: 1,
    orderBy: {
      created_at: "desc",
    },
  });
  return tweets;
  //
}

export type InitTweetsType = Prisma.PromiseReturnType<typeof getInitTweets>;

export default async function Home() {
  const initTweets = await getInitTweets();

  const logOut = async () => {
    "use server";
    const session = await getSession();
    await session.destroy();
    redirect("/");
  };

  return (
    <>
      <div>
        <form action={logOut} className="flex w-full h-full mt-5">
          <button className="w-full h-10 rounded-full px-4 bg-orange-300 cursor-pointer font-bold flex justify-center items-center hover:scale-105 hover:bg-orange-600 hover:transition-all shadow-neutral-600 shadow-lg">
            <span>logout</span>
          </button>
        </form>
        <TweetList InitTweet={initTweets} />
      </div>
    </>
  );
}
