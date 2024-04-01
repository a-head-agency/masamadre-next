import { SVGProps } from "react";

export default function CardIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 32 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0 0V21.2121H18.9394V19.697H1.51515V9.09091H25.7576V12.8788H27.2727V0H0ZM1.51515 4.54545V1.51515H25.7576V4.54545H1.51515ZM31.0606 19.697V21.2121H27.2727V25H25.7576V21.2121H21.9697V19.697H25.7576V15.9091H27.2727V19.697H31.0606Z"
        fill="currentColor"
      />
    </svg>
  );
}
