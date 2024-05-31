export default function Loading() {
  return (
    <>
      <div className="p-5 animate-pulse flex flex-col gap-5">
        {[...Array(2)].map((_, index) => (
          <div
            key={index}
            className="grid grid-cols-tweetcol grid-rows-121 gap-2"
          >
            <div className="row-span-3 flex justify-center items-center w-full h-full">
              <div className="size-28 bg-neutral-700 rounded-md" />
            </div>
            <div className="h-5 w-1/3 bg-neutral-700 rounded-md" />
            <div className="h-full w-2/3 bg-neutral-700 rounded-md" />
            <div className="h-5 bg-neutral-700 rounded-md" />
          </div>
        ))}
      </div>
    </>
  );
}
