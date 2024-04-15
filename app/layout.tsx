import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Script from "next/script";

const masamadreFontRegular = localFont({
  src: "./fonts/basis-grotesque-mono/basis-grotesque-mono-regular-pro.woff2",
  display: "swap",
  weight: "400",
  variable: "--font-masamadre-400",
});

const masamadreFontBold = localFont({
  src: "./fonts/basis-grotesque-mono/basis-grotesque-mono-bold-pro.woff2",
  display: "swap",
  weight: "700",
  variable: "--font-masamadre-700",
});

export const metadata: Metadata = {
  title: "Masamadre",
  description: "Masamadre description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${masamadreFontRegular.variable} ${masamadreFontBold.variable} scroll-smooth scroll-pt-32`}
    >
      <head>
        <Script>
          {`(function (m, e, t, r, i, k, a) {
    m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments) };
    m[i].l = 1 * new Date();
    for (var j = 0; j < document.scripts.length; j++) { if (document.scripts[j].src === r) { return; } }
    k = e.createElement(t), a = e.getElementsByTagName(t)[0], k.async = 1, k.src = r, a.parentNode.insertBefore(k, a)
})
    (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

ym(97034850, "init", {
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true
});`}
        </Script>
        <noscript>
          <div>
            <img
              src="https://mc.yandex.ru/watch/97034850"
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>
      </head>
      <body className="font-regular bg-white leading-none text-base lowercase selection:bg-black selection:text-white">
        {children}
      </body>
    </html>
  );
}
