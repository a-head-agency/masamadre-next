"use client";

import Link from "next/link";
import gsap from "gsap";
import MotionPathPlugin from "gsap/MotionPathPlugin";
import { useGSAP } from "@gsap/react";

function TreeSvg(props: { className?: string }) {
  return (
    <svg
      viewBox="0 0 328 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        overflow: "visible",
      }}
      {...props}
    >
      <g id="tree 1">
        <g id="mm_logotypes_es 1">
          <g id="g834">
            <g id="Group 1">
              <g id="g840">
                <path
                  id="path842"
                  d="M0.00455111 246.209C0.00455111 243.602 -0.000782877 240.994 0.00855112 238.387C0.00988412 237.867 0.0325511 237.343 0.109884 236.83C0.376551 235.053 0.989881 234.474 2.79388 234.286C3.15922 234.247 3.55388 234.227 3.90055 234.323C6.34855 234.995 8.69388 234.83 11.0952 233.927C12.9032 233.247 14.7272 233.802 16.3006 234.867C17.8592 235.925 19.2766 235.846 20.8592 234.869C23.9126 232.979 27.3859 233.395 29.3939 235.786C30.4672 237.063 30.8659 238.617 31.0232 240.23C31.1486 241.523 31.2246 242.827 31.2339 244.129C31.2579 247.741 31.2859 251.354 31.2139 254.966C31.1539 257.961 28.8726 259.359 26.1299 258.078C25.5752 257.818 25.0966 257.121 24.8619 256.517C24.6032 255.847 24.6046 255.055 24.5979 254.315C24.5699 250.666 24.5979 247.015 24.5592 243.366C24.5459 242.175 24.4512 240.974 23.4646 240.078C22.6086 239.299 21.4232 239.281 20.5352 240.023C19.4446 240.934 19.1099 242.169 19.0006 243.498C18.9459 244.165 18.9579 244.838 18.9566 245.507C18.9486 248.562 18.9419 251.615 18.9459 254.67C18.9499 258.079 17.3392 258.854 14.1139 258.153C13.5072 258.021 12.8952 257.219 12.5939 256.581C12.2926 255.946 12.3139 255.127 12.3086 254.389C12.2792 250.925 12.3019 247.461 12.2792 243.998C12.2739 243.258 12.2112 242.506 12.0712 241.781C11.8166 240.465 11.0032 239.666 9.91119 239.535C8.87522 239.413 7.74455 240.051 7.31522 241.263C6.96055 242.265 6.73655 243.355 6.70188 244.415C6.61522 247.094 6.66722 249.777 6.66188 252.458C6.66055 253.241 6.64988 254.023 6.65122 254.805C6.65655 258.343 4.60588 258.831 1.69388 258.117C1.12055 257.977 0.561881 257.182 0.293884 256.561C0.0112171 255.91 0.0232171 255.105 0.0165511 254.365C-0.0114489 251.646 0.00455111 248.927 0.00455111 246.209Z"
                  fill="black"
                />
              </g>
              <g id="g844">
                <path
                  id="path846"
                  d="M52.9332 249.116C52.7719 250.566 52.2719 251.85 50.9679 252.682C49.6972 253.492 48.3706 253.434 47.5039 252.529C46.6746 251.664 46.6852 249.906 47.5266 248.821C48.3039 247.82 49.4239 247.356 51.1932 247.302C52.4972 247.264 53.0746 247.842 52.9332 249.116ZM60.3066 242.729C60.2519 241.362 60.0812 239.978 59.7626 238.65C59.2012 236.317 57.7932 234.6 55.5759 233.592C53.0212 232.43 50.3799 232.066 47.6319 232.73C44.4226 233.505 41.9226 235.088 41.1572 238.57C40.6719 240.782 40.9506 241.122 43.2412 241.097C43.9812 241.089 44.7292 241.03 45.4559 240.898C46.5172 240.705 47.3612 240.193 47.9506 239.208C48.6186 238.09 49.7212 237.654 50.7879 237.893C51.9159 238.146 52.7199 239.06 52.9399 240.336C53.1652 241.653 52.6426 242.404 51.3386 242.634C49.5079 242.96 47.6519 243.188 45.8492 243.629C41.3759 244.724 39.2319 247.92 39.7826 252.498C40.2199 256.128 42.8572 258.47 46.4746 258.55C48.3599 258.593 50.0879 258.21 51.6706 257.178C52.2212 256.82 52.8612 256.476 53.3559 257.15C53.9746 257.992 54.7826 258.12 55.7132 258.094C56.7172 258.068 57.7226 258.105 58.7266 258.077C59.9946 258.04 60.3026 257.745 60.3172 256.457C60.3426 254.04 60.3946 244.884 60.3066 242.729Z"
                  fill="black"
                />
              </g>
              <g id="g848">
                <path
                  id="path850"
                  d="M192.128 249.555C191.989 250.954 191.516 252.216 190.485 253.239C189.051 254.664 187.341 254.855 186.152 253.686C184.979 252.534 184.997 250.331 186.177 249.014C187.279 247.784 188.781 247.719 190.067 247.571C191.672 247.572 192.265 248.171 192.128 249.555ZM198.432 240.774C198.055 237.639 196.344 235.298 193.252 234.224C190.331 233.21 187.375 233.256 184.511 234.414C182.143 235.371 180.679 237.186 180.211 239.724C180.008 240.827 180.425 241.388 181.525 241.464C182.488 241.53 183.485 241.61 184.416 241.424C185.023 241.303 185.588 240.774 186.076 240.324C186.475 239.958 186.676 239.379 187.064 238.996C187.98 238.092 189.412 237.93 190.472 238.528C191.569 239.148 192.395 240.959 192.116 242.195C191.809 243.552 190.673 243.614 189.597 243.795C187.839 244.092 186.043 244.275 184.339 244.768C179.461 246.182 177.396 251.099 179.693 255.63C180.533 257.286 181.872 258.35 183.708 258.711C186.197 259.203 188.508 258.864 190.552 257.218C191.492 256.46 191.916 256.632 192.719 257.452C193.191 257.933 193.901 258.293 194.564 258.444C195.308 258.613 196.119 258.508 196.9 258.482C198.343 258.431 198.825 257.957 198.847 256.488C198.877 254.442 198.815 243.94 198.432 240.774Z"
                  fill="black"
                />
              </g>
              <g id="g852">
                <path
                  id="path854"
                  d="M104.98 254.408C107.08 254.385 109.156 251.649 108.464 249.655C108.267 249.085 107.619 248.461 107.043 248.273C105.099 247.64 102.68 249.308 102.4 251.336C102.175 252.971 103.396 254.425 104.98 254.408ZM115.488 255.024C115.438 258.248 113.796 259.565 110.779 258.425C108.695 257.637 106.992 258.003 105.004 258.68C100.116 260.343 96.0108 257.595 95.7801 252.528C95.5708 247.948 99.4295 245.164 102.906 244.587C103.97 244.411 105.043 244.293 106.107 244.113C107.292 243.912 108.211 243.301 108.543 242.107C108.811 241.14 108.186 239.903 107.278 239.319C106.376 238.74 105.02 238.82 104.031 239.561C103.556 239.916 103.163 240.38 102.691 240.737C102.254 241.068 101.791 241.408 101.284 241.597C99.9837 242.083 98.4068 241.753 97.7601 240.943C97.1708 240.204 97.3521 238.712 98.1521 237.487C99.4468 235.503 101.375 234.527 103.622 234.177C105.923 233.819 108.24 233.833 110.427 234.789C113.355 236.068 114.982 238.423 115.244 241.527C115.464 244.109 115.519 253.127 115.488 255.024Z"
                  fill="black"
                />
              </g>
              <g id="g856">
                <path
                  id="path858"
                  d="M139.223 237.417C139.338 235.391 140.665 234.23 142.662 234.415C145.446 234.673 148.119 234.206 150.849 233.879C152.311 233.705 153.922 234.269 155.387 234.743C156.958 235.251 158.407 235.301 159.946 234.691C161.833 233.943 163.781 233.381 165.803 234.185C168.277 235.167 169.541 237.137 169.773 239.674C169.998 242.15 170.013 244.653 170.01 247.143C170.007 249.782 169.947 252.426 169.767 255.058C169.663 256.57 168.425 257.71 167.13 257.819C165.618 257.947 164.25 257.018 163.895 255.494C163.687 254.597 163.605 253.658 163.574 252.733C163.469 249.574 163.45 246.411 163.305 243.254C163.274 242.591 162.957 241.87 162.574 241.311C161.597 239.89 160.154 239.91 159.046 241.25C157.834 242.715 157.855 244.513 157.779 246.241C157.674 248.619 157.777 251.007 157.717 253.389C157.686 254.61 157.602 255.847 156.661 256.822C155.003 258.539 152.423 258.006 151.671 255.723C151.419 254.959 151.306 254.121 151.29 253.313C151.239 250.67 151.306 248.023 151.237 245.382C151.21 244.354 151.034 243.306 150.754 242.315C150.459 241.273 149.835 240.423 148.575 240.409C147.615 240.398 146.474 241.289 146.195 242.447C145.927 243.561 145.742 244.717 145.707 245.859C145.631 248.315 145.709 250.775 145.654 253.233C145.637 254.037 145.482 254.861 145.251 255.635C144.775 257.231 143.693 257.938 142.081 257.83C140.586 257.729 139.418 256.739 139.255 255.145C139.061 253.225 139.05 251.286 138.99 249.354C138.957 248.238 139.062 240.27 139.223 237.417Z"
                  fill="black"
                />
              </g>
              <g id="g860">
                <path
                  id="path862"
                  d="M78.8018 258.769C75.3658 258.614 72.7392 258.131 70.7632 255.909C69.6285 254.631 69.3818 253.183 70.1738 252.17C71.0405 251.062 72.6552 250.799 74.1272 251.586C75.0112 252.059 75.7992 252.771 76.7272 253.082C77.4205 253.314 78.3685 253.283 79.0152 252.977C79.4338 252.778 79.6538 251.878 79.6938 251.274C79.7192 250.891 79.3445 250.321 78.9858 250.105C78.0752 249.559 77.1032 249.077 76.1018 248.729C72.6752 247.537 70.1418 245.49 69.4632 241.754C68.8418 238.337 70.8672 235.131 74.2378 234.178C77.4272 233.277 80.6005 233.427 83.5565 235.025C84.4005 235.482 85.1205 236.29 85.7032 237.081C86.3672 237.982 86.0952 239.586 85.3592 240.269C84.3445 241.211 82.6618 241.375 81.5205 240.673C80.8898 240.283 80.2418 239.921 79.5818 239.582C78.8285 239.195 78.1938 239.402 77.7605 240.105C77.3005 240.85 77.4285 241.63 78.1152 242.087C78.8405 242.57 79.6938 242.887 80.5272 243.171C83.0392 244.025 85.1538 245.435 86.5832 247.679C89.1498 251.707 87.3232 256.626 82.7512 257.987C81.2672 258.429 79.7018 258.597 78.8018 258.769Z"
                  fill="black"
                />
              </g>
              <g id="g864">
                <path
                  id="path866"
                  d="M239.349 237.322C239.453 235.357 240.757 234.311 242.708 234.39C245.082 234.486 247.434 234.711 249.812 234.229C251.176 233.951 252.328 234.793 252.62 235.898C252.908 236.991 252.22 238.274 250.996 238.906C250.238 239.298 249.433 239.614 248.724 240.078C246.321 241.653 245.901 244.149 245.81 246.735C245.737 248.854 245.889 250.983 245.734 253.094C245.645 254.309 245.326 255.585 244.782 256.667C244.177 257.87 242.886 258.013 241.641 257.738C240.384 257.459 239.662 256.569 239.401 255.363C239.213 254.498 239.129 253.597 239.113 252.709C239.074 250.514 239.194 240.249 239.349 237.322Z"
                  fill="black"
                />
              </g>
              <g id="g868">
                <path
                  id="path870"
                  d="M221.697 250.742C221.03 251.898 220.181 252.892 218.694 252.914C217.055 252.939 216.027 251.864 215.442 250.578C214.829 249.227 212.987 243.319 216.281 240.515C217.934 238.939 220.011 238.974 221.225 240.895C221.985 242.099 222.407 243.602 222.647 245.027C222.977 246.988 222.719 248.966 221.697 250.742ZM229.194 227.06C229.038 224.683 227.865 223.784 225.481 224.043C225.258 224.067 225.038 224.108 224.817 224.139C223.682 224.295 222.941 224.934 222.814 226.064C222.666 227.391 222.666 228.734 222.587 230.07C222.531 231.032 222.546 232.014 222.361 232.952C222.134 234.099 221.363 234.552 220.213 234.378C219.773 234.311 219.333 234.203 218.914 234.052C214.331 232.396 210.514 235.336 209.139 238.952C207.411 243.503 207.335 248.15 208.934 252.738C210.617 257.567 214.753 260.116 219.889 257.688C221.198 257.068 222.374 257.231 223.735 257.706C226.949 258.828 229.431 258.35 229.25 254.208C229.234 253.836 229.254 253.463 229.254 253.091C229.254 249.143 229.254 245.195 229.254 241.247C229.254 238.231 229.258 235.214 229.253 232.198C229.249 230.484 229.307 228.767 229.194 227.06Z"
                  fill="black"
                />
              </g>
              <g id="g872">
                <path
                  id="path874"
                  d="M271.423 238.846C273.027 238.856 274.209 239.97 274.165 241.426C274.123 242.852 272.993 243.792 271.344 243.774C269.801 243.758 268.577 242.712 268.605 241.434C268.635 240.055 269.963 238.835 271.423 238.846ZM271.273 248.07C272.223 247.962 273.204 248.062 274.165 248.127C275.204 248.198 276.237 248.443 277.271 248.43C279.849 248.395 281.537 246.786 281.505 244.228C281.439 238.631 278.16 233.468 271.48 233.708C265.843 233.715 262.023 236.855 260.947 242.378C260.427 245.044 260.436 247.718 261.056 250.358C261.776 253.42 263.316 255.912 266.231 257.402C268.944 258.788 271.783 259.051 274.696 258.332C276.372 257.919 277.921 257.179 279.035 255.752C279.837 254.724 279.996 253.378 279.384 252.536C278.679 251.568 277.607 251.292 276.275 251.787C275.72 251.992 275.204 252.302 274.66 252.54C273.912 252.867 273.177 253.258 272.396 253.466C270.78 253.895 268.907 252.795 268.605 251.327C268.268 249.683 269.351 248.29 271.273 248.07Z"
                  fill="black"
                />
              </g>
            </g>
            <g id="tree">
              <path
                id="path878-2"
                d="M135.744 78.9735C131.005 80.0229 124.544 77.8389 121.701 65.0082C118.859 52.1762 120.711 33.5575 125.448 32.5082C130.187 31.4589 136.332 41.0082 139.175 53.8402C142.019 66.6709 140.481 77.9229 135.744 78.9735ZM104.297 86.9135C101.62 90.5442 91.4831 87.6122 81.6531 80.3642C71.8241 73.1162 66.0251 64.2989 68.7011 60.6695C71.3771 57.0402 82.1491 58.0135 91.3441 67.2202C99.9751 75.8602 106.973 83.2842 104.297 86.9135ZM92.8411 22.4882C97.3641 13.4295 102.475 11.6162 105.82 13.2869C109.165 14.9562 108.495 26.1869 103.972 35.2442C99.4491 44.3029 92.7871 47.7602 89.4411 46.0895C86.0961 44.4202 88.3171 31.5469 92.8411 22.4882ZM151.301 37.1682L151.3 37.1655C147.569 31.0269 142.343 27.6815 135.547 24.5095C134.264 24.0629 132.365 23.5749 130.839 23.7575C130.445 23.7229 129.869 23.8175 129.353 23.9335C127.148 14.3855 123.201 8.19617 117.039 4.53484C115.635 3.55884 113.992 2.82417 112.695 2.33217L112.72 2.22683C112.448 2.1455 112.184 2.07483 111.916 2.00683L111.556 1.91483C110.816 1.67083 110.085 1.46016 109.437 1.32283C107.607 0.846836 104.344 0.553504 104.207 0.541504L104.199 0.596171C100.503 0.304171 85.0711 1.9935 82.7441 3.69083C77.2881 7.42417 73.3551 13.3562 69.9051 19.2269C66.2451 25.7415 64.4801 32.3589 64.8161 38.4949C65.1321 40.1482 65.7751 41.6175 66.3951 43.0402C66.6271 43.5682 66.8531 44.0895 67.1091 44.7202C67.4001 45.2535 67.8441 45.9655 68.1961 46.5149C63.8451 49.6002 59.7641 58.2469 59.5321 59.0922C56.4271 71.2802 56.7331 81.5949 65.2761 88.9655C66.5001 90.0149 73.6001 96.1469 76.6291 97.7082C78.1881 98.5122 82.3571 98.6122 84.4121 98.1869C86.4211 97.7735 89.4601 97.1442 90.2191 97.7589C91.1091 98.4775 90.4681 102.343 90.1931 103.995C90.0751 104.711 89.9731 105.332 89.9351 105.779C89.8321 106.924 89.5931 108.275 89.3411 109.705C88.4131 114.941 87.2611 121.457 91.8591 124.305C94.4761 125.925 97.7731 126.627 100.736 126.891C103.395 127.127 105.78 126.907 107.181 126.899C110.087 126.881 110.087 124.584 111.235 116.541C111.34 115.803 113.24 99.8962 113.261 93.2775C113.707 93.2602 114.124 93.2309 114.487 93.1895C115.235 93.1815 115.98 93.1909 116.727 93.2015C119.005 93.2335 121.361 93.2682 123.731 92.7775C125.941 92.4282 132.299 89.6535 133.179 89.3829C134.725 88.9095 136.324 88.4162 137.841 87.5242C143.012 84.3975 147.249 78.6282 149.909 74.3122C157.383 61.2909 157.877 48.1015 151.301 37.1682Z"
                fill="black"
              />
              <g id="bread-left" className="bread bread-left">
                <path
                  id="Vector"
                  className="bread-body"
                  fill="black"
                  fillOpacity="0"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M68.702 60.6701C69.705 59.3091 71.848 58.5939 74.618 58.7189C79.235 58.9272 85.598 61.4667 91.345 67.2209C99.975 75.8609 106.974 83.2849 104.298 86.9142C101.62 90.5449 91.482 87.6114 81.653 80.3634C71.824 73.1154 66.026 64.2994 68.702 60.6701ZM85.626 66.3608C85.38 65.4128 82.594 65.3128 79.402 66.1382C76.21 66.9635 73.82 68.4022 74.066 69.3502C74.311 70.2995 77.098 70.3995 80.29 69.5728C83.483 68.7475 85.871 67.3102 85.626 66.3608ZM91.006 70.5702C91.251 71.5182 88.862 72.9569 85.67 73.7822C82.478 74.6076 79.69 74.5089 79.445 73.5596C79.199 72.6116 81.589 71.1729 84.782 70.3476C87.974 69.5222 90.761 69.6222 91.006 70.5702ZM91.05 77.9916C94.242 77.1662 96.631 75.7276 96.386 74.7796C96.141 73.8316 93.354 73.7316 90.162 74.5569C86.969 75.3822 84.579 76.8209 84.825 77.7689C85.07 78.7182 87.858 78.8169 91.05 77.9916Z"
                />
                <g id="cuts" className="cuts" fill="black" fillOpacity="1">
                  <path
                    id="path914"
                    d="M79.402 66.1382C82.594 65.3129 85.38 65.4129 85.626 66.3609C85.871 67.3102 83.483 68.7475 80.29 69.5729C77.098 70.3995 74.311 70.2995 74.066 69.3502C73.82 68.4022 76.21 66.9635 79.402 66.1382Z"
                  />
                  <path
                    id="path910"
                    d="M91.0059 70.5704C91.2509 71.5184 88.8619 72.957 85.6699 73.7824C82.4779 74.6077 79.6899 74.509 79.4449 73.5597C79.1989 72.6117 81.5889 71.173 84.7819 70.3477C87.9739 69.5224 90.7609 69.6224 91.0059 70.5704Z"
                  />
                  <path
                    id="path906"
                    d="M96.386 74.7796C96.631 75.7276 94.242 77.1663 91.05 77.9916C87.858 78.817 85.07 78.7183 84.825 77.769C84.579 76.821 86.969 75.3823 90.162 74.557C93.354 73.7316 96.141 73.8316 96.386 74.7796Z"
                  />
                </g>
              </g>
              <g id="bread-right" className="bread bread-right">
                <path
                  id="Vector_2"
                  className="bread-body"
                  fill="black"
                  fillOpacity="0"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M125.448 32.5079C125.744 32.4427 126.046 32.4183 126.352 32.4337C130.942 32.6652 136.51 41.8099 139.175 53.8399C142.019 66.6706 140.482 77.922 135.745 78.9727C131.006 80.022 124.545 77.8385 121.702 65.0079C118.859 52.1759 120.711 33.5572 125.448 32.5079ZM126.314 60.2936C125.842 61.2363 128.03 63.2883 131.204 64.8776C134.377 66.467 137.332 66.991 137.804 66.0483C138.276 65.1056 136.086 63.0523 132.914 61.4643C129.741 59.875 126.786 59.351 126.314 60.2936ZM124.93 53.0739C125.402 52.1312 128.357 52.6552 131.53 54.2446C134.702 55.8339 136.891 57.8859 136.419 58.8286C135.947 59.7712 132.993 59.2472 129.819 57.6579C126.647 56.0686 124.458 54.0166 124.93 53.0739ZM130.146 47.0251C126.972 45.4358 124.018 44.9118 123.546 45.8544C123.074 46.7971 125.263 48.8491 128.435 50.4384C131.608 52.0278 134.563 52.5518 135.035 51.6091C135.507 50.6664 133.318 48.6144 130.146 47.0251Z"
                />
                <g id="cuts_2" className="cuts" fill="black" fillOpacity="1">
                  <path
                    id="path902"
                    d="M131.205 64.8777C128.031 63.2884 125.843 61.2364 126.315 60.2937C126.787 59.351 129.742 59.875 132.915 61.4644C136.087 63.0524 138.277 65.1057 137.805 66.0484C137.333 66.991 134.378 66.467 131.205 64.8777Z"
                  />
                  <path
                    id="path898"
                    d="M124.93 53.0739C125.402 52.1312 128.357 52.6552 131.53 54.2445C134.702 55.8339 136.891 57.8859 136.419 58.8285C135.947 59.7712 132.993 59.2472 129.819 57.6579C126.647 56.0685 124.458 54.0165 124.93 53.0739Z"
                  />
                  <path
                    id="path894"
                    d="M123.546 45.8545C124.018 44.9118 126.972 45.4358 130.146 47.0252C133.318 48.6145 135.507 50.6665 135.035 51.6092C134.563 52.5518 131.608 52.0278 128.435 50.4385C125.263 48.8492 123.074 46.7972 123.546 45.8545Z"
                  />
                </g>
              </g>
              <g id="bread-top" className="bread bread-top">
                <path
                  id="Vector_3"
                  className="bread-body"
                  fill="black"
                  fillOpacity="0"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M92.84 22.4885C96.374 15.4114 100.266 12.7569 103.395 12.7307C104.271 12.7233 105.087 12.9218 105.819 13.2873C109.164 14.9566 108.494 26.187 103.971 35.2443C99.448 44.303 92.7871 47.7607 89.442 46.09C86.0961 44.4207 88.316 31.5472 92.84 22.4885ZM93.5201 30.603C92.7801 30.9376 93.0951 33.2283 94.2231 35.719C95.3511 38.2096 96.8661 39.9563 97.6061 39.6216C98.3461 39.2856 98.031 36.995 96.903 34.5056C95.775 32.015 94.2601 30.2683 93.5201 30.603ZM96.194 25.6108C96.934 25.2761 98.449 27.0228 99.577 29.5135C100.705 32.0028 101.018 34.2935 100.278 34.6295C99.538 34.9641 98.0251 33.2175 96.8971 30.7268C95.7691 28.2361 95.454 25.9455 96.194 25.6108ZM102.251 24.5211C101.123 22.0305 99.608 20.2838 98.868 20.6185C98.128 20.9531 98.443 23.2438 99.571 25.7345C100.699 28.2251 102.212 29.9718 102.952 29.6371C103.692 29.3011 103.379 27.0105 102.251 24.5211Z"
                />
                <g id="cuts_3" className="cuts" fill="black" fillOpacity="1">
                  <path
                    id="path890"
                    d="M94.223 35.7191C93.095 33.2284 92.78 30.9377 93.52 30.6031C94.26 30.2684 95.775 32.0151 96.903 34.5057C98.031 36.9951 98.346 39.2857 97.606 39.6217C96.866 39.9564 95.351 38.2097 94.223 35.7191Z"
                  />
                  <path
                    id="path886"
                    d="M96.1941 25.6107C96.9341 25.276 98.4491 27.0227 99.5771 29.5133C100.705 32.0027 101.018 34.2933 100.278 34.6293C99.5381 34.964 98.0251 33.2173 96.8971 30.7267C95.7691 28.236 95.4541 25.9453 96.1941 25.6107Z"
                  />
                  <path
                    id="path882"
                    d="M98.8679 20.6185C99.6079 20.2838 101.123 22.0305 102.251 24.5211C103.379 27.0105 103.692 29.3011 102.952 29.6371C102.212 29.9718 100.699 28.2251 99.5709 25.7345C98.4429 23.2438 98.1279 20.9531 98.8679 20.6185Z"
                  />
                </g>
              </g>
            </g>
          </g>
        </g>
        <g id="panaderia">
          <path
            id="path39"
            d="M190.54 161.494C190.54 164.234 192.079 165.905 194.09 165.905C196.079 165.905 197.661 164.234 197.661 161.494C197.661 158.755 196.079 157.084 194.09 157.084C192.079 157.084 190.54 158.755 190.54 161.494ZM189 155.736H190.667V157.803C191.502 156.318 192.871 155.412 194.497 155.412C197.405 155.412 199.373 157.942 199.373 161.494C199.373 165.047 197.341 167.578 194.432 167.578C192.722 167.578 191.331 166.672 190.667 165.396V171.99H189V155.736Z"
            fill="#231F20"
          />
          <path
            id="path41"
            d="M212.811 161.472V161.146L209.304 161.751C207.829 162.006 207.058 162.795 207.058 163.98C207.058 165.187 207.829 165.952 209.111 165.952C211.421 165.952 212.811 163.793 212.811 161.472ZM213.495 167.253C213.09 166.766 212.811 166.022 212.811 164.977C212.105 166.627 210.65 167.579 208.962 167.579C206.738 167.579 205.348 166.116 205.348 164.003C205.348 161.842 206.888 160.682 209.004 160.311L212.811 159.706V159.243C212.811 157.594 211.785 156.944 210.224 156.944C208.491 156.944 207.507 157.757 207.507 158.708C207.507 158.825 207.486 158.87 207.55 159.058L206.096 159.614C205.989 159.313 205.925 159.01 205.925 158.685C205.925 156.944 207.635 155.411 210.224 155.411C213.024 155.411 214.48 156.828 214.48 159.174V164.375C214.48 165.674 214.651 166.347 215.206 167.253H213.495Z"
            fill="#231F20"
          />
          <path
            id="path43"
            d="M230.976 167.253H229.308V160.055C229.308 158.035 228.345 157.036 226.784 157.036C225.115 157.036 223.49 158.5 223.49 161.123V167.253H221.823V155.735H223.49V157.827C224.282 156.362 225.479 155.411 227.276 155.411C229.458 155.411 230.976 156.851 230.976 159.544V167.253Z"
            fill="#231F20"
          />
          <path
            id="path45"
            d="M244.992 161.472V161.146L241.485 161.751C240.009 162.006 239.239 162.795 239.239 163.98C239.239 165.187 240.009 165.952 241.292 165.952C243.602 165.952 244.992 163.793 244.992 161.472ZM245.676 167.253C245.27 166.766 244.992 166.022 244.992 164.977C244.287 166.627 242.831 167.579 241.142 167.579C238.919 167.579 237.529 166.116 237.529 164.003C237.529 161.842 239.068 160.682 241.185 160.311L244.992 159.706V159.243C244.992 157.594 243.965 156.944 242.405 156.944C240.672 156.944 239.688 157.757 239.688 158.708C239.688 158.825 239.667 158.87 239.731 159.058L238.277 159.614C238.17 159.313 238.106 159.01 238.106 158.685C238.106 156.944 239.816 155.411 242.405 155.411C245.205 155.411 246.661 156.828 246.661 159.174V164.375C246.661 165.674 246.831 166.347 247.387 167.253H245.676Z"
            fill="#231F20"
          />
          <path
            id="path47"
            d="M261.981 161.494C261.981 158.755 260.441 157.084 258.431 157.084C256.442 157.084 254.859 158.755 254.859 161.494C254.859 164.234 256.442 165.905 258.431 165.905C260.441 165.905 261.981 164.234 261.981 161.494ZM263.52 167.252H261.853V165.209C261.189 166.604 259.928 167.578 258.195 167.578C255.18 167.578 253.149 165.047 253.149 161.494C253.149 157.942 255.265 155.412 258.195 155.412C259.928 155.412 261.169 156.224 261.853 157.71V151H263.52V167.252Z"
            fill="#231F20"
          />
          <path
            id="path49"
            d="M271.035 160.311H277.922C277.816 158.152 276.254 156.944 274.607 156.944C272.724 156.944 271.292 158.268 271.035 160.311ZM270.95 161.798C271.056 164.211 272.404 166.046 274.607 166.046C276.617 166.046 277.452 164.792 278.136 163.284L279.355 164.026C278.436 166.068 277.045 167.579 274.542 167.579C271.527 167.579 269.368 165.046 269.368 161.495C269.368 157.942 271.656 155.411 274.607 155.411C277.857 155.411 279.59 157.966 279.59 161.332V161.798H270.95Z"
            fill="#231F20"
          />
          <path
            id="path51"
            d="M293.114 159.219C293.156 159.034 293.178 158.87 293.178 158.708C293.178 157.594 292.215 156.99 291.125 156.99C289.413 156.99 288.216 158.569 288.216 161.518V167.253H286.548V155.735H288.216V157.594C288.686 156.572 289.735 155.411 291.595 155.411C293.584 155.411 294.889 156.736 294.889 158.476C294.889 158.918 294.802 159.381 294.632 159.845L293.114 159.219Z"
            fill="#231F20"
          />
          <path
            id="path53"
            d="M306.723 151H309.011L306.723 154.204H305.205L306.723 151ZM302.745 155.735H307.536V165.767H311.194V167.253H302.211V165.767H305.867V157.221H302.745V155.735Z"
            fill="#231F20"
          />
          <path
            id="path55"
            d="M325.444 161.472V161.146L321.937 161.751C320.462 162.006 319.691 162.795 319.691 163.98C319.691 165.187 320.462 165.952 321.744 165.952C324.054 165.952 325.444 163.793 325.444 161.472ZM326.128 167.253C325.723 166.766 325.444 166.022 325.444 164.977C324.738 166.627 323.283 167.579 321.595 167.579C319.371 167.579 317.981 166.116 317.981 164.003C317.981 161.842 319.521 160.682 321.637 160.311L325.444 159.706V159.243C325.444 157.594 324.418 156.944 322.857 156.944C321.124 156.944 320.14 157.757 320.14 158.708C320.14 158.825 320.119 158.87 320.183 159.058L318.729 159.614C318.622 159.313 318.558 159.01 318.558 158.685C318.558 156.944 320.268 155.411 322.857 155.411C325.657 155.411 327.113 156.828 327.113 159.174V164.375C327.113 165.674 327.284 166.347 327.839 167.253H326.128Z"
            fill="#231F20"
          />
        </g>
      </g>
    </svg>
  );
}

export default function Home() {
  useGSAP(() => {
    const bottomTextBlock = document.querySelector("#footer--text-block")!;
    const firstRow = document.querySelector("#footer--first-row")!;
    const secondRow = document.querySelector("#footer--second-row")!;

    let breadTopDy;
    let breadLeftDy;
    let breadRightDy;

    let lastLeafXOffset;

    if (window.getComputedStyle(bottomTextBlock, null).display === "none") {
      console.log("overide", window.screen.height);
      breadTopDy = window.screen.height + 20;
      breadLeftDy = window.screen.height;
      breadRightDy = window.screen.height;
      lastLeafXOffset = 100;
    } else {
      breadTopDy = MotionPathPlugin.getRelativePosition(
        document.querySelector(".bread-top")!,
        firstRow
      ).y;
      breadLeftDy = MotionPathPlugin.getRelativePosition(
        document.querySelector(".bread-left")!,
        firstRow
      ).y;
      breadRightDy = MotionPathPlugin.getRelativePosition(
        document.querySelector(".bread-right")!,
        secondRow
      ).y;
      lastLeafXOffset = 200;
    }

    const rightBreadTL = gsap
      .timeline()
      .to(".bread-right .bread-body", {
        fillOpacity: 1,
        duration: 0.01,
      })
      .to(".bread-right .cuts", {
        fillOpacity: 0,
        duration: 0.01,
      })
      .to(".bread-right", {
        y: (breadRightDy / 12) * 4,
        rotate: -15,
        duration: 3.5,
        ease: "none",
      })
      .to(".bread-right", {
        y: (breadRightDy / 12) * 8,
        rotate: 15,
        duration: 3.5,
        ease: "none",
      })
      .to(".bread-right", {
        y: (breadRightDy / 12) * 10,
        rotate: -60,
        duration: 2.5,
        ease: "none",
      })
      .to(".bread-right", {
        y: (breadRightDy / 12) * 12 - 16,
        rotate: 16,
        duration: 3.5,
        ease: "none",
      });

    const leftBreadTL = gsap
      .timeline()
      .to(".bread-left .bread-body", {
        fillOpacity: 1,
        duration: 0.01,
      })
      .to(".bread-left .cuts", {
        fillOpacity: 0,
        duration: 0.01,
      })
      .to(".bread-left", {
        y: (breadLeftDy / 12) * 4,
        rotate: 60,
        x: -30,
        duration: 6,
        ease: "none",
      })
      .to(".bread-left", {
        y: (breadLeftDy / 12) * 5.5,
        rotate: 180,
        duration: 3,
        ease: "none",
      })
      .to(".bread-left", {
        y: (breadLeftDy / 12) * 12 + 24,
        rotate: 270,
        duration: 14,
        ease: "none",
      });

    const topBreadTL = gsap
      .timeline()
      .to(".bread-top .bread-body", {
        fillOpacity: 1,
        duration: 0.01,
      })
      .to(".bread-top .cuts", {
        fillOpacity: 0,
        duration: 0.01,
      })
      .to(".bread-top", {
        y: (breadTopDy / 12) * 12,
        duration: 14,
        ease: "none",
      })
      .to(
        ".bread-top",
        {
          rotate: -42,
          x: lastLeafXOffset,
          ease: "power1.inOut",
          duration: 6,
        },
        "-=11"
      )
      .to(
        ".bread-top",
        {
          rotate: 60,
          ease: "power1.inOut",
          duration: 5,
        },
        "-=5"
      );

    gsap
      .timeline({ repeat: -1, repeatDelay: 5 })
      .add(rightBreadTL)
      .add(leftBreadTL, "-=6")
      .add(topBreadTL, "-=2");
  });

  return (
    <main className="flex flex-col h-svh">
      <div className="basis-1/2 flex items-center justify-between px-[2vmax]">
        <div className="basis-1/2"></div>
        <TreeSvg className="h-36 lg:h-60" />
        <div></div>
      </div>
      <div className="flex flex-col gap-x-4 gap-y-8 justify-between md:flex-row px-[2vmax] w-full max-w-[50%] absolute top-1/2 -translate-y-1/2">
        <Link href="/order">заказ</Link>
        {/* <Link href="/booking">бронирование</Link> */}
        <Link href="/work">сотрудничество</Link>
        <div className="grow[0.5] hidden md:block"></div>
      </div>

      <div className="grow"></div>

      <div className="flex justify-between items-end gap-4 px-[2vmax] pb-[2vmax]">
        <div className="flex flex-col">
          <Link href="https://vk.com">vk</Link>
          <Link href="https://vk.com">tg</Link>
          <Link href="https://vk.com">доставка и оплата</Link>
          <Link href="https://vk.com">контакты</Link>
        </div>
        <div id="footer--text-block" className="hidden lg:block">
          <p className="mb-4">
            <span id="footer--first-row">El panadería de manera nueva</span>
            <br />
            <span id="footer--second-row">
              En la cocina abierta puedes ver todos procesos del pan ¡Vamos!
            </span>
          </p>
          <p className="normal-case">© All Rights Reserved.</p>
        </div>
      </div>
    </main>
  );
}
