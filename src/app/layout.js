import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ScrollToTop from "./components/ScrollToTop";
import { JobProvider } from "./context/JobContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "YELLOW SAPPHIRE",
  icons: {
    icon: [
      { url: "/yellow-sapphire.ico", type: "image/x-icon" },
      { url: "/YellowSapphire-icon.png", type: "image/png" },
    ],
    shortcut: "/yellow-sapphire.ico",
    apple: "/yellow-sapphire.ico",
  },
  description: "Created by DASHR Group",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <JobProvider>
          {children}
          <ScrollToTop />
        </JobProvider>
      </body>
    </html>
  );
}
