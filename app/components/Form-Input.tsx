interface IFormInput {
  svgPath1: string;
  svgPath2?: string;
  textData: string;
  inputData: string;
  errors?: string[];
  success?: string[];
}

export function FormInputComponent(props: IFormInput) {
  return (
    <>
      <div className="border border-neutral-400 w-full h-14 rounded-full px-4 bg-transparent transition-all [&:has(:focus-visible)]:ring-2  ring-neutral-400 ring-offset-2">
        <div className="flex flex-row justify-center items-center h-full">
          <div className="w-5 h-5 text-[#525252]">
            <svg
              data-slot="icon"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d={props.svgPath1}></path>
              <path d={props.svgPath2}></path>
            </svg>
          </div>
          <input
            className="w-full px-3 outline-none "
            placeholder={props.textData}
            name={props.textData}
            type={props.inputData}
            required={true}
          />
        </div>
      </div>
      {props.errors?.map((error, index) => (
        <div
          key={index}
          className="bg-red-500 w-full h-14 rounded-xl px-4 text-black"
        >
          <div className="w-full h-full flex flex-row justify-start items-center gap-4 font-bold">
            <div className="w-6 h-6">
              <svg
                data-slot="icon"
                fill="none"
                stroke-width="1.5"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                ></path>
              </svg>
            </div>

            <span>{error}</span>
          </div>
        </div>
        // <span key={index} className="text-red-500 font-medium">
        //   {error}
        // </span>
      ))}
      {props.success?.map((success, index) => (
        <>
          <div
            key={index}
            className="bg-[#32bc70] w-full h-14 rounded-xl px-4 text-black"
          >
            <div className="w-full h-full flex flex-row justify-start items-center gap-4 font-bold">
              <div className="w-6 h-6">
                <svg
                  data-slot="icon"
                  fill="none"
                  stroke-width="1.5"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                  ></path>
                </svg>
              </div>

              <span>{success}</span>
            </div>
          </div>
        </>

        // <span key={index} className="text-green-500 font-medium">
        //   {error}
        // </span>
      ))}
    </>
  );
}
