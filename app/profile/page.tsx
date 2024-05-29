import getSession from "@/app/lib/sessions";
import db from "@/app/lib/db";
import { notFound, redirect } from "next/navigation";

async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if (user) {
      return user;
    }
  }
  notFound();
}

const logOut = async () => {
  "use server";
  const session = await getSession();
  await session.destroy();
  redirect("/");
};

export default async function Profile() {
  const user = await getUser();

  return (
    <>
      <div className="flex flex-row justify-between items-center mt-20">
        <div>
          <div className="flex flex-row justify-between items-center">
            <span className="text-lg font-bold">Access Success</span>
            <div>
              <form action={logOut} className="flex w-full h-full">
                <button className="w-full h-10 rounded-full px-4 bg-orange-300 cursor-pointer font-bold flex justify-center items-center hover:scale-105 hover:bg-orange-600 hover:transition-all shadow-neutral-600 shadow-lg">
                  <span>logout</span>
                </button>
              </form>
            </div>
          </div>
          <br />

          <div className="grid grid-cols-2 grid-rows-7 bg-neutral-500 text-white rounded-lg p-4 pb-8 gap-5 place-items-center shadow-slate-700 shadow-xl">
            <div className="col-span-2 flex justify-center items-center">
              <span>Info Card</span>
            </div>
            <div>
              <span>Unique number</span>
            </div>
            <div>
              <span>{user.id}</span>
            </div>
            <div>
              <span>Name</span>
            </div>
            <div>
              <span>{user.username}</span>
            </div>
            <div>
              <span>E-mail</span>
            </div>
            <div>
              <span>{user.email}</span>
            </div>
            <div>
              <span>Information</span>
            </div>
            <div>
              <span>{user.bio}</span>
            </div>
            <div>
              <span>Membership registration</span>
            </div>
            <div>
              <span>{user.created_at.toDateString()}</span>
            </div>
            <div>
              <span>Update Membership</span>
            </div>
            <div>
              <span>{user.updated_at.toDateString()}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
