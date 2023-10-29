/* eslint-disable @next/next/no-sync-scripts */
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prayer Times",
  description: "Prayer Times",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script src="https://polyfill.io/v3/polyfill.min.js?features=globalThis"></script>
      </head>
      <body className="bg">{children}</body>
    </html>
  );
}
