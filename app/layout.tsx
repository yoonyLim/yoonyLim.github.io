import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Yoony's Blog",
  description: "Yoony is filled with DETERMINATION",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const header = (
    <header>
      <div className="h-14 flex items-center">
        <Link href="/">Yoony's Blog</Link>
      </div>
    </header>
  )

  const footer = (
    <footer>
      <div>
        <div>
          <div>Github</div>
          <div>© 2024 Hayoon Lim</div>
        </div>
      </div>
    </footer>
  )

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="px-20">
          <div>{ header }</div>
          <div>{ children }</div>
          <div>{ footer }</div>
        </div>
      </body>
    </html>
  );
}
