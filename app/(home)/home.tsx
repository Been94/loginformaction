import Link from "next/link";

export function Main() {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-full w-full gap-5">
        <Link
          href="/create-account"
          className="w-full flex flex-row justify-center items-center"
        >
          <div className="w-1/2 h-14 rounded-full px-4 bg-neutral-300 cursor-pointer font-bold flex justify-center items-center hover:scale-105 hover:bg-[#efeae8]">
            <span>CreateAccount</span>
          </div>
        </Link>
        <Link
          href="/log-in"
          className="w-full flex flex-row justify-center items-center"
        >
          <div className="w-1/2 h-14 rounded-full px-4 bg-neutral-300 cursor-pointer font-bold flex justify-center items-center hover:scale-105 hover:bg-[#efeae8]">
            <span>Login</span>
          </div>
        </Link>
      </div>
    </>
  );
}
