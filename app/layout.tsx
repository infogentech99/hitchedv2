import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hitched-demo.vercel.app/"),

  openGraph: {
    title: "Dhiraj Weds Ritika - InviteArc",
    description: "Premium wedding invitation templates by InviteArc",
    url: "https://hitched-demo.vercel.app/",
    siteName: "InviteArc",
    images: [
      {
        url: "/assets/og.jpg",
        width: 1200,
        height: 630,
        alt: "Dhiraj Weds Ritika - InviteArc",
      },
    ],
    type: "website",
  },


  twitter: {
    card: "summary_large_image",
    title: "Dhiraj Weds Ritika - InviteArc",
    description: "Premium wedding invitation templates by InviteArc",
    images: ["/assets/og.jpg"],
  },

 other: {
    "og:image:secure_url": "https://hitched-demo.vercel.app/og.jpg",
    "og:image:type": "image/jpg",
  },


};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
