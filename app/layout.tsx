import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Terminal Portfolio",
  description: "A terminal-styled portfolio website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {/* Subtle retro effects */}
        <div className="vignette" />
        <div className="scanlines" />
        
        {children}
      </body>
    </html>
  );
}
