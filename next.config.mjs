import path from "node:path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Включаем карты исходников для продакшн-бандла, чтобы убрать предупреждение Lighthouse
  productionBrowserSourceMaps: true,
  // Тонкая настройка размеров изображений, чтобы Next подбирал размеры
  // ближе к фактическим контейнерам (500px, 440px и т.п.) и не генерировал
  // чрезмерно большие варианты вроде 828px / 750px для маленьких иконок.
  images: {
    deviceSizes: [320, 360, 414, 440, 500, 640, 768, 1024, 1280],
    imageSizes: [64, 96, 128, 160, 192, 256, 320, 384],
    formats: ["image/avif", "image/webp"]
  },
  // Next.js 16 использует Turbopack по умолчанию. Если в проекте есть алиасы из webpack,
  // их нужно продублировать в конфиге Turbopack, иначе `next build` упадёт.
  turbopack: {
    resolveAlias: {
      // В Turbopack алиасы должны быть заданы как пути относительно корня проекта.
      "react-router-dom": "./src/react-router-dom.tsx",
      pages: "./src/legacy-pages",
      utils: "./src/utils",
    },
  },
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


