import { SVGProps } from "react";

export default function CrossIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 31 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <line
        x1="1.35355"
        y1="0.646447"
        x2="30.3536"
        y2="29.6464"
        stroke="currentColor"
      />
      <line
        y1="-0.5"
        x2="41.0122"
        y2="-0.5"
        transform="matrix(-0.707107 0.707107 0.707107 0.707107 30 1)"
        stroke="currentColor"
      />
    </svg>
  );
}
