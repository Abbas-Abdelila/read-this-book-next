import type { Metadata } from "next";
import "./globals.css";
import localFont from 'next/font/local'

const fkGrotesk = localFont({
  src: '../public/fonts/fk-grotesk-neue-regular.otf',
  display: 'swap',
})




export const metadata: Metadata = {
  title: "Read This Book Next",
  description: "Find your next book to read easily based on your favorite books and authors",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={fkGrotesk.className}>{children}</body>
    </html>
  );
}
