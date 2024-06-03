import db from "@/app/lib/db";
import getSession from "@/app/lib/sessions";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";
import TweetList from "@/app/components/TweetList";
import TweetForm from "../(tweetForm)/TweetForm";

import { getInitTweets } from "./actions";

export type InitTweetsType = Prisma.PromiseReturnType<typeof getInitTweets>;

export default async function Home() {
  const initTweets = await getInitTweets(2);

  const logOut = async () => {
    "use server";
    const session = await getSession();
    await session.destroy();
    redirect("/");
  };

  return (
    <>
      <div>
        <div className="fixed top-0 w-1/3">
          <div className="flex flex-col w-full h-full bg-[#f9f6f6] border-b-2 pb-8 border-neutral-300">
            <div className="flex justify-end items-center">
              <form
                action={logOut}
                className="flex justify-end w-1/5 h-full mt-5"
              >
                <button className="w-full h-10 rounded-full px-4 bg-orange-300 cursor-pointer font-bold flex justify-center items-center hover:scale-105 hover:bg-orange-600 hover:transition-all shadow-neutral-600 shadow-lg">
                  <span>logout</span>
                </button>
              </form>
            </div>

            <div className="flex justify-start items-center">
              <TweetForm />
            </div>
          </div>
        </div>

        <TweetList InitTweet={initTweets} />
      </div>
    </>
  );
}
