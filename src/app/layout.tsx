import { Poppins as FontSans } from "next/font/google";
import type { Metadata } from "next";

import { ThemeProvider } from "@/context/theme-context";
import Header from "@/design-system/orgnisms/header";
import Footer from "@/design-system/orgnisms/footer";
import { Toaster } from "@/design-system/atoms/toaster";

import "./globals.css";
import WagmiContextProvider from "@/context/wagmi-context";

const fontSans = FontSans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "TDepo Faucet",
  description: "TDepo Faucet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={fontSans.className}>
        <WagmiContextProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster />
            <Header />
            {children}
            <Footer />
          </ThemeProvider>
        </WagmiContextProvider>
      </body>
    </html>
  );
}
