import { FC, type ComponentPropsWithoutRef } from "react";

const LeftPart: FC<ComponentPropsWithoutRef<"svg">> = (props) => {
  return (
    <svg
      viewBox="0 0 150 344"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <mask
        id="mask0_2002_33"
        style={{
          maskType: "alpha",
        }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="150"
        height="344"
      >
        <rect width="150" height="344" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_2002_33)">
        <path
          d="M36.7889 84.9083L0.0569133 337.455C-0.186748 339.117 0.36149 340.78 1.51888 341.984C2.67627 343.245 4.32099 343.933 6.08753 343.933H293.912C295.679 343.933 297.324 343.245 298.481 341.984C299.639 340.722 300.187 339.06 299.943 337.455L263.211 84.9083C262.785 82.0417 260.226 79.9778 257.181 79.9778H214.479V60.7143C214.479 27.2326 185.544 0 149.97 0C114.395 0 85.4602 27.2326 85.4602 60.7143V79.9778H42.7586C39.7128 79.9778 37.1544 82.099 36.7279 84.9083H36.7889ZM97.7042 60.7143C97.7042 33.5391 121.157 11.4663 150.03 11.4663C178.904 11.4663 202.357 33.5391 202.357 60.7143V79.9778H97.7042V60.7143ZM50.1995 91.4441H85.5211V125.212C85.5211 128.366 88.2623 130.946 91.6127 130.946C94.963 130.946 97.7042 128.366 97.7042 125.212V91.4441H202.357V125.212C202.357 128.366 205.098 130.946 208.448 130.946C211.799 130.946 214.54 128.366 214.54 125.212V91.4441H251.942L287.029 332.524H13.0928L48.18 91.4441H50.1995Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
};

const MiddlePart: FC<ComponentPropsWithoutRef<"svg">> = (props) => {
  return (
    <svg
      viewBox="0 0 73 344"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M0 0H73V11.4648H0V0Z" fill="currentColor" />
      <path d="M0 332.527H73V343.934H0L0 332.527Z" fill="currentColor" />
      <path d="M0 79.9805H73V91.4453H0V79.9805Z" fill="currentColor" />
    </svg>
  );
};

const RightPart: FC<ComponentPropsWithoutRef<"svg">> = (props) => {
  return (
    <svg
      viewBox="0 0 150 344"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <mask
        id="mask0_2002_32"
        style={{
          maskType: "alpha",
        }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="150"
        height="344"
      >
        <rect
          width="150"
          height="344"
          transform="matrix(-1 0 0 1 150 0)"
          fill="#D9D9D9"
        />
      </mask>
      <g mask="url(#mask0_2002_32)">
        <path
          d="M113.211 84.9083L149.943 337.455C150.187 339.117 149.639 340.78 148.481 341.984C147.324 343.245 145.679 343.933 143.912 343.933H-143.912C-145.679 343.933 -147.324 343.245 -148.481 341.984C-149.639 340.722 -150.187 339.06 -149.943 337.455L-113.211 84.9083C-112.785 82.0417 -110.226 79.9778 -107.181 79.9778H-64.4789V60.7143C-64.4789 27.2326 -35.5441 0 0.0304387 0C35.605 0 64.5398 27.2326 64.5398 60.7143V79.9778H107.241C110.287 79.9778 112.846 82.099 113.272 84.9083H113.211ZM52.2958 60.7143C52.2958 33.5391 28.8434 11.4663 -0.0304744 11.4663C-28.9043 11.4663 -52.3568 33.5391 -52.3568 60.7143V79.9778H52.2958V60.7143ZM99.8005 91.4441H64.4789V125.212C64.4789 128.366 61.7377 130.946 58.3873 130.946C55.037 130.946 52.2958 128.366 52.2958 125.212V91.4441H-52.3568V125.212C-52.3568 128.366 -55.098 130.946 -58.4483 130.946C-61.7986 130.946 -64.5398 128.366 -64.5398 125.212V91.4441H-101.942L-137.029 332.524H136.907L101.82 91.4441H99.8005Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
};

const BasketIcon: FC<{ count?: number } & ComponentPropsWithoutRef<"div">> = ({
  count = 0,
  ...rest
}) => {
  return (
    <div
      {...rest}
      className={(rest.className || "") + " flex relative justify-center gap-0"}
    >
      <LeftPart className="h-full translate-x-[0.5px]" />
      <MiddlePart
        className="h-full"
        style={{
          width: Math.floor(Math.log10(count)) + "ch",
          display: count <= 9 && count >= 0 ? "none" : undefined,
        }}
        preserveAspectRatio="none"
      />
      <RightPart className="h-full -translate-x-[0.5px]" />

      <div className="absolute select-none text-xs font left-1/2 -translate-x-1/2 translate-y-1/2 bottom-[35%] leading-none">
        {count > 0 && count}
      </div>
    </div>
  );
};

export default BasketIcon;
