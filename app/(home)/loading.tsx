export default function Loading() {
  return (
    <>
      <div className="p-5 animate-pulse flex flex-col gap-5">
        {[...Array(10)].map((_, index) => (
          <div
            key={index}
            className="grid grid-rows-1fr3fr mt-5 rounded-lg gap-2"
          >
            <div className="grid grid-cols-3">
              <div className="flex justify-start items-center">
                <span className="h-5 w-2/3 text-left bg-neutral-700 rounded-md" />
              </div>
              <div className="flex justify-center items-center">
                <span className="h-5 w-2/3 text-center bg-neutral-700 rounded-md" />
              </div>
              <div className="flex justify-end items-center">
                <span className="h-5 w-1/3 bg-neutral-700 rounded-md" />
              </div>
            </div>
            <div className="">
              <p className="h-full w-full  bg-neutral-700 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
