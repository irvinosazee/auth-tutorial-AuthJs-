import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next Auth V5 - Advanced Guide (2024)",
  description: "Code With Antonio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
