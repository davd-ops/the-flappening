import type { Metadata } from "next";
import "./globals.css";
import SchemaMarkup from "@/components/SchemaMarkup";

export const metadata: Metadata = {
  title: "The Flappening | PENGU Tracker",
  description: "Track PENGU's journey to become the world's leading memecoin by market cap. Compare PENGU with DOGE, SHIBA, PEPE and more in real-time.",
  keywords: ["PENGU", "memecoin", "cryptocurrency", "market cap", "DOGE", "SHIBA", "PEPE", "flappening"],
  authors: [{ name: "David Bailey" }],
  creator: "David Bailey",
  publisher: "The Flappening",
  openGraph: {
    title: "The Flappening | PENGU Tracker",
    description: "Track PENGU's journey to become the world's leading memecoin by market cap. Compare with DOGE, SHIBA, PEPE and more in real-time.",
    url: "https://theflappening.com",
    siteName: "The Flappening",
    images: [
      {
        url: "https://theflappening.com/ogimage.png",
        width: 1200,
        height: 630,
        alt: "The Flappening - PENGU vs Memecoins Market Cap Tracker",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Flappening | PENGU Tracker",
    description: "Track PENGU's journey to become the world's leading memecoin by market cap. Compare with DOGE, SHIBA, PEPE and more in real-time.",
    images: ["https://theflappening.com/ogimage.png"],
    creator: "@davidbailey_eth",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://theflappening.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/pengu_hexagon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#477dfd" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="The Flappening" />
        <link rel="apple-touch-icon" href="/pengu_hexagon.png" />
      </head>
      <body>
        {children}
        <SchemaMarkup />
      </body>
    </html>
  );
}