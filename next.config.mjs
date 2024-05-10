const configure = () => {
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
        {
          source: "/profile/orders",
          destination: "/profile/orders/take-away",
          permanent: false,
        },
      ];
    },
  };

  return nextConfig;
};

export default configure;
