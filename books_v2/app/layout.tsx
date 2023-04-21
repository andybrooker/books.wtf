import "./globals.css";
import { Manrope, Source_Serif_Pro } from "next/font/google";

export const metadata = {
  title: "Books",
  description: "What makes a classic?",
};

const sans = Manrope({
  variable: "--font-sans",
  display: "swap",
  subsets: ["latin"],
});
const serif = Source_Serif_Pro({
  variable: "--font-serif",
  display: "swap",
  weight: ["200", "300", "400", "600"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
