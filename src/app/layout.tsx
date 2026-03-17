import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/shared/SmoothScroll";
import NeuralBackground from "@/components/shared/NeuralBackground";
import Navbar from "@/components/layout/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata = {
  title: "Kyle Eurie | Systems Architect",
  description: "Advanced Full Stack Development & Enterprise Solutions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body 
        className={`${outfit.variable} ${inter.variable} font-sans bg-background text-foreground antialiased`}
        suppressHydrationWarning
      >
        <SmoothScroll>
          <div className="bg-noise" />
          <NeuralBackground />
          <Navbar />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
