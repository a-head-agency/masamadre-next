/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  redirects() {
    return [
      {
        source: "/checkout",
        destination: "/checkout/self-receipt",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
