import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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
      <body className="font-regular bg-white leading-none text-base lowercase selection:bg-black selection:text-white">
        {children}
      </body>
    </html>
  );
}
