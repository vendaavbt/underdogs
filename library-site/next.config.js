// eslint-disable-next-line @typescript-eslint/no-var-requires
/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/accueil',
        permanent: true, // mettez false si vous ne voulez pas d'une redirection permanente
      },
    ];
  },
};

module.exports = nextConfig;
