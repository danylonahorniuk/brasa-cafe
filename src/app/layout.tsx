import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartProvider from "@/context/CartContext";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Brasa — Кафе з доставкою",
    template: "%s | Brasa",
  },
  description: "Піца на дровах, роли, бургери та авторські коктейлі. Доставка по Києву. Три локації: Поділ, Печерськ, Оболонь.",
  metadataBase: new URL("https://brasa-cafe-w12n.vercel.app"),
  openGraph: {
    title: "Brasa — Кафе з доставкою",
    description: "Піца на дровах, роли, бургери та авторські коктейлі. Доставка по Києву.",
    url: "https://brasa-cafe-w12n.vercel.app",
    siteName: "Brasa",
    images: [
      {
        url: "https://images.unsplash.com/photo-1536622308015-0740925b8221?w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Brasa — Піца на дровах",
      },
    ],
    locale: "uk_UA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brasa — Кафе з доставкою",
    description: "Піца на дровах, роли, бургери та авторські коктейлі. Доставка по Києву.",
    images: ["https://images.unsplash.com/photo-1536622308015-0740925b8221?w=1200&q=80"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk" className={`${cormorant.variable} ${dmSans.variable}`} data-scroll-behavior="smooth">
      <body className="min-h-screen flex flex-col">
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
