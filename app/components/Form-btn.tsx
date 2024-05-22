"use client";
import { useFormStatus } from "react-dom";

interface FormButtonProps {
  text: string;
}

export default function FormButton(props: FormButtonProps) {
  const { pending } = useFormStatus();
  return (
    <>
      <div>
        <button
          disabled={pending}
          className="w-full h-14 rounded-full px-4 bg-[#efeae8] cursor-pointer font-bold disabled:cursor-not-allowed disabled:bg-neutral-400 disabled:text-white"
        >
          {pending ? "Loading..." : props.text}
        </button>
      </div>
    </>
  );
}
