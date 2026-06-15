import "./globals.css";
import { Inter } from "next/font/google";
import Analytics from "./components/Analytics";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "Zuralio",
  description:
    "Discover destinations that match your personality and travel style.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}