import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Providers } from "@/utils/providers";

export const metadata: Metadata = {
  title: {
    default: "App Movies TMDB",
    template: "%s — App Movies TMDB",
  },
  description:
    "Explore filmes, séries, atores e muito mais com dados da API do TMDB.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
