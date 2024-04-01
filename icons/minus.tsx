import { SVGProps } from "react";

export default function MinusIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_2643_3)">
        <rect
          x="20"
          y="9"
          width="1.5"
          height="20"
          transform="rotate(90 20 9)"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_2643_3">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
