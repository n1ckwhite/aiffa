/** @type {import('knip').KnipConfig} */
export default {
  // Entry points for Next.js App Router + legacy router entry (if used).
  entry: [
    "src/app/**/{page,layout,loading,error,not-found,route}.{ts,tsx}",
    "src/app/**/head.tsx",
    "src/react-router-dom.tsx",
    "src/legacy-pages/**/*.{ts,tsx}",
  ],
  project: ["tsconfig.json"],
  ignore: ["**/*.test.*", "**/*.spec.*", "**/__tests__/**"],
};

