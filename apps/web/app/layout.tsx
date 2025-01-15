import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Providers from "./providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic", "latin-ext", "cyrillic-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Digital Menu",
  description: "Электронное меню для вашего заведения",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${inter.variable} antialiased`}>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
