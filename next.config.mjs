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
      ];
    },
  };

  return nextConfig;
};

export default configure;
