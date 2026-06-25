import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Epoxy Nation Pro | Phoenix's #1 Epoxy & Concrete Coating Specialists",
  description: "Phoenix epoxy floor experts. Garage floors, commercial spaces, patios & polished concrete. Free digital estimate in 10 minutes. Powered by Xtreme Polishing Systems.",
  keywords: "epoxy floor Phoenix, garage floor coating Phoenix AZ, epoxy flooring Phoenix, concrete coating Phoenix",
  openGraph: {
    title: "Epoxy Nation Pro | Phoenix's #1 Epoxy Floor Specialists",
    description: "Digital bid in 10 minutes. Real-time project tracking. Lifetime warranty. Powered by Xtreme Polishing Systems.",
    images: ["https://cdn.shopify.com/s/files/1/0754/8905/0678/files/phoenix-epoxy-pros-service-garage.webp"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="theme-color" content="#050505" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}
