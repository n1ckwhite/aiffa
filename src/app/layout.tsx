import type { Metadata } from "next";
import React from "react";
import { ChakraRootProvider } from "../providers/ChakraRootProvider";
import MainLayout from "@/widgets/MainLayout";

export const metadata: Metadata = {
  title: "JavaScript Universe – Next",
  description: "Next.js версия курса JavaScript Universe"
};

type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body>
        <ChakraRootProvider>
          <MainLayout>{children}</MainLayout>
        </ChakraRootProvider>
      </body>
    </html>
  );
};

export default RootLayout;


