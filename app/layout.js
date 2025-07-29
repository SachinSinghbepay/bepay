// app/layout.js or app/layout.jsx
import { Open_Sans, Montserrat } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/smoothScroll";

// Load Open Sans as the main font
const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
});

// Load Montserrat for selective use
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata = {
  title: "Bepay",
  description: "A simple and secure way to pay your bills",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} antialiased`}>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
