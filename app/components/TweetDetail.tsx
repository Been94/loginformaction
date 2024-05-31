import Link from "next/link";
import { formatToTime } from "../utils/utils";

interface IUser {
  username: string;
  email: string;
}

interface ITweetDetail {
  tweet: string;
  created_at: Date;
  id: number;
  user: IUser;
}

export default function TweetDetail({
  tweet,
  created_at,
  id,
  user,
}: ITweetDetail) {
  return (
    <>
      <Link href={`/tweets/${id}`}>
        <div className="grid grid-rows-1fr3fr border border-black mt-5 rounded-lg hover:bg-neutral-300">
          <div className="grid grid-cols-3 px-2">
            <span className="text-left">#{user.username}</span>
            <span className="text-center">
              {formatToTime(String(created_at))}
            </span>
            <span className="text-right">
              {created_at.toLocaleDateString("ko-KR", {
                hour: "numeric",
                minute: "2-digit",
                second: "2-digit",
              })}
            </span>
          </div>
          <div className="px-4">
            <p className="line-clamp-2 text-ellipsis overflow-hidden">
              {tweet}
            </p>
          </div>
        </div>
      </Link>
    </>
  );
}
