import { SVGProps } from "react";

export default function ArrowIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 20 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.6004 1L18.0004 9.4L9.6004 17.8"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path d="M17.7 9.3999H0" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}
