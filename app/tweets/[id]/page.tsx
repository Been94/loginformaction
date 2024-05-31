import { IconBtn } from "@/app/components/Icon-btn";
import db from "@/app/lib/db";
import getSession from "@/app/lib/sessions";
import { IconType, formatToTime } from "@/app/utils/utils";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

async function getIsOwner(userId: number) {
  const session = await getSession();
  if (session.id) {
    return session.id === userId;
  }
  return false;
}

async function getTweetDetail(id: number) {
  const tweetDetail = await db.tweet.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          username: true,
          email: true,
        },
      },
    },
  });
  //console.log(await db.tweet.count());
  return tweetDetail;
  //await new Promise((resolve) => setTimeout(resolve, 10000));
}

async function getTweetDetailCount() {
  return await db.tweet.count();
}

export default async function TweetDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }
  const tweetDetail = await getTweetDetail(id);
  const tweetDetailCount = await getTweetDetailCount();
  if (!tweetDetail) {
    redirect("/");
  }

  const isOwner = await getIsOwner(tweetDetail.userId);

  return (
    <>
      <div className="grid grid-cols-3 mt-5">
        {id - 1 <= 0 ? (
          <div></div>
        ) : (
          <Link href={`/tweets/${id - 1}`}>
            <div className="flex justify-start items-center hover:text-neutral-400">
              <IconBtn className="size-10 " svgData={IconType.leftIcon} />
            </div>
          </Link>
        )}
        <Link href={`/`}>
          <div className="flex justify-center items-center hover:text-neutral-400">
            <IconBtn className="size-10 " svgData={IconType.homeIcon} />
          </div>
        </Link>

        {id !== tweetDetailCount ? (
          <>
            <Link href={`/tweets/${id + 1}`}>
              <div className="flex justify-end items-center hover:text-neutral-400">
                <IconBtn className="size-10 " svgData={IconType.rightIcon} />
              </div>
            </Link>
          </>
        ) : (
          <div></div>
        )}
      </div>

      <div className="grid grid-cols-2 grid-rows-1/2fr1/2fr3fr mt-5 rounded-lg gap-2 border border-dashed border-neutral-500 p-4 cursor-default">
        <div className="row-span-2 flex flex-col justify-center items-center">
          <span>#{tweetDetail.user.username}</span>
          <span>{"(" + tweetDetail.user.email + ")"}</span>
        </div>
        <div className="flex justify-end items-center">
          <span>{formatToTime(String(tweetDetail.created_at))}</span>
        </div>
        <div className="flex justify-end items-center">
          <span>
            {tweetDetail.updated_at.toLocaleDateString("ko-KR", {
              hour: "numeric",
              minute: "2-digit",
              second: "2-digit",
            })}
          </span>
        </div>
        <div className="col-span-2 px-2">
          <p>{tweetDetail.tweet}</p>
        </div>
      </div>
    </>
  );
}
