import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "core-js/full/global-this";

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
      <body className="bg">{children}</body>
    </html>
  );
}
