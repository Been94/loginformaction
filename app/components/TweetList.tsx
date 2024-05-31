"use client";
import TweetDetail from "@/app/components/TweetDetail";
import { InitTweetsType } from "@/app/(home)/page";
import { useEffect, useRef, useState } from "react";
import { getMoreTweets } from "@/app/(home)/actions";

interface ITweetList {
  InitTweet: InitTweetsType;
}

export default function TweetList({ InitTweet }: ITweetList) {
  const [tweet, setTweet] = useState(InitTweet);
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const trigger = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      async (
        entries: IntersectionObserverEntry[],
        observer: IntersectionObserver
      ) => {
        const element = entries[0];
        if (element.isIntersecting && trigger.current) {
          observer.unobserve(trigger.current);
          setLoading(true);
          const newTweets = await getMoreTweets(page + 1);
          if (newTweets.length !== 0) {
            setPage((prev) => prev + 1);
            setTweet((prev) => [...prev, ...newTweets]);
          } else {
            setIsLastPage(true);
          }

          setLoading(false);
        }
        console.log(entries[0].isIntersecting);
      },
      { threshold: 1.0, rootMargin: "0px  0px -100px 0px" }
    );
    if (trigger.current) {
      observer.observe(trigger.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [page]);

  // const onLoadMoreClick = async () => {};

  return (
    <>
      <div className="p-5 flex flex-col gap-5">
        {tweet.map((data, index) => (
          <TweetDetail key={data.id} {...data} />
        ))}

        {!isLastPage ? (
          <>
            <span
              ref={trigger}
              style={{ marginTop: `${page + 1 * 75}vh` }}
              className="mb-96 text-sm font-semibold bg-orange-500 w-fit mx-auto px-3 py-2 rounded-md hover:opacity-90 active:scale-95"
            >
              {isLoading ? (
                "Loading..."
              ) : (
                <>
                  <div className="flex justify-between items-center w-full ">
                    <div className="w-10 h-10">
                      <svg
                        data-slot="icon"
                        fill="none"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        ></path>
                      </svg>
                    </div>
                    Load more scroll!
                  </div>
                </>
              )}
            </span>
          </>
        ) : null}
      </div>
    </>
  );
}
