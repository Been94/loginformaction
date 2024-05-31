import { InputHTMLAttributes, useRef } from "react";
import { MsgViewer } from "../etc";

interface IFormInput {
  svgPath1: string;
  svgPath2?: string;
  errors?: string[];
}

export function FormInputComponent({
  svgPath1,
  svgPath2,
  errors,
  ...extraProps
}: IFormInput & InputHTMLAttributes<HTMLInputElement>) {
  const inputRef = useRef<HTMLInputElement>(null);

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
              <path d={svgPath1}></path>
              <path d={svgPath2}></path>
            </svg>
          </div>
          <input
            ref={inputRef}
            className="w-full px-3 outline-none"
            {...extraProps}
          />
        </div>
      </div>
      {errors?.map((error, index) => {
        if (error.includes("Welcome Back!")) {
          return (
            <MsgViewer
              key={index}
              colorData="bg-[#32bc70]"
              data="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
              error={error}
            />
          );
        } else {
          return (
            <MsgViewer
              key={index}
              colorData="bg-red-500"
              data="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              error={error}
            />
          );
        }
      })}
    </>
  );
}
