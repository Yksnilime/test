import type { Metadata } from "next";
import "./globals.css";
import GlobalContextProvider from "@/ContextApi";

export const metadata: Metadata = {
  title: "Bitvault - Code Snippet Manager",
  description: "A modern code snippet manager for developers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GlobalContextProvider>
        <body>{children}</body>
      </GlobalContextProvider>
    </html>
  );
}
