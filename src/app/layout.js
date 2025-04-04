import { Roboto } from "next/font/google";
import "./globals.css";
import ScrollToTop from "./components/ScrollToTop";
import { JobProvider } from "./context/JobContext";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata = {
  title: "Yellow Sapphire",
  icons: {
    icon: [
      {
        url: "/favicon-for-public/favicon-16x16.png",
        type: "image/png",
        sizes: "16x16",
      },
      {
        url: "/favicon-for-public/favicon-32x32.png",
        type: "image/png",
        sizes: "32x32",
      },
      {
        url: "/favicon-for-public/favicon-192x192.png",
        type: "image/png",
        sizes: "192x192",
      },
      {
        url: "/favicon-for-public/favicon-512x512.png",
        type: "image/png",
        sizes: "512x512",
      },
    ],
    shortcut: "/yellow-sapphire.ico", // classic .ico fallback
    apple: "/favicon-for-public/apple-touch-icon.png", // for iOS home screen
  },

  description: "Created by DASHR Group",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon-for-public/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-for-public/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-for-public/favicon-16x16.png"
        />
        <link rel="shortcut icon" href="/yellow-sapphire.ico" />
      </head>
      <body className={`${roboto.className} antialiased`}>
        <JobProvider>
          {children}
          <ScrollToTop />
        </JobProvider>
      </body>
    </html>
  );
}
