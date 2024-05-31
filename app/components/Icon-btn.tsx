import { HTMLAttributes } from "react";

interface IIconBtn {
  svgData: string;
}

export function IconBtn({
  svgData,
  ...rest
}: IIconBtn & HTMLAttributes<HTMLDivElement>) {
  return (
    <>
      <div {...rest}>
        <svg
          data-slot="icon"
          fill="none"
          strokeWidth="1.5"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d={svgData} />
        </svg>
      </div>
    </>
  );
}
