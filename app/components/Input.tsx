interface IC {
  svgPath1: string;
  svgPath2?: string;
  textData: string;
  inputData: string;
}

export function InputComponent(props: IC) {
  return (
    <div className="border border-neutral-400 w-full h-14 rounded-full px-4 bg-transparent [&:has(:focus-visible)]:ring-2 ring-neutral-400 ring-offset-2">
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
  );
}
