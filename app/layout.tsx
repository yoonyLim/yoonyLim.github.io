import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "@/components/Provider";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "YOONY'S DEV",
  description: "Yoony is filled with DETERMINATION",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-gray-50 text-black dark:bg-[#181818] dark:text-white`} >
          {/*Provider is used to suppress different rendering data between the server side and the client side when using Dark Mode*/}
          <Provider>
            <div>
              <Header />
              <div className="flex px-10 xl:px-20 py-10 min-h-dvh">
                <Sidebar />
                <div className="w-full">{ children }</div>
              </div>
              <Footer />
            </div>
          </Provider>
      </body>
    </html>
  );
}
