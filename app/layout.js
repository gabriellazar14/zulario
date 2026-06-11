import "./globals.css";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";

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

        {/* Google Analytics */}
        <GoogleAnalytics gaId="G-7GFNDWQLJS" />

        {/* Microsoft Clarity */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);
              t.async=1;
              t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];
              y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "x5avisbaft");
          `}
        </Script>
      </body>
    </html>
  );
}