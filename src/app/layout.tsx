import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/base/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Medical Billing System",
  description: "A system for managing medicines and billing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 container mx-auto px-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
