/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  // redirects() {
  //   return [
  //     {
  //       source: "/((?!tech-works|logo).*):slug*",
  //       destination: "/tech-works",
  //       permanent: false,
  //     },
  //   ];
  // },
};

export default nextConfig;
