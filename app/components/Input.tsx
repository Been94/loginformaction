import { SVGProps } from "react";

export function InputComponent(svgData: any, textData: string) {
  return (
    <div className="flex flex-row justify-center items-center h-full">
      <div className="w-5 h-5 text-[#525252]">{svgData}</div>
      <input className="w-full px-3 outline-none" placeholder={textData} />
    </div>
  );
}
