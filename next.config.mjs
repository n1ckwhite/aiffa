import path from "node:path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Включаем карты исходников для продакшн-бандла, чтобы убрать предупреждение Lighthouse
  productionBrowserSourceMaps: true,
  webpack: (config) => {
    config.resolve.alias["react-router-dom"] = path.resolve(
      process.cwd(),
      "src/react-router-dom.tsx"
    );
    config.resolve.alias["pages"] = path.resolve(process.cwd(), "src/legacy-pages");
    config.resolve.alias["utils"] = path.resolve(process.cwd(), "src/utils");
    return config;
  }
};

export default nextConfig;


