import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Provider } from "@/components/Provider";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer"

const spoqa = localFont({
  src: [
    {
      path: "../public/fonts/SpoqaHanSansNeo-Bold.ttf",
      weight: "700"
    },
    {
      path: "../public/fonts/SpoqaHanSansNeo-Medium.ttf",
      weight: "500"
    },
    {
      path: "../public/fonts/SpoqaHanSansNeo-Regular.ttf",
      weight: "400"
    },
    {
      path: "../public/fonts/SpoqaHanSansNeo-Light.ttf",
      weight: "300"
    },
    {
      path: "../public/fonts/SpoqaHanSansNeo-Thin.ttf",
      weight: "100"
    }
  ],
  variable: "--font-spoqa"
})

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
    <html lang="en">
      <body className={`${spoqa.className} bg-gray-50 text-black dark:bg-[#181818] dark:text-white`} >
          {/*Provider is used to suppress different rendering data between the server side and the client side when using Dark Mode*/}
          <Provider>
            <div>
              <Header />
              <div className="flex px-10 xl:px-20 py-10 min-h-dvh">
                <Sidebar />
                <main className="w-full" suppressHydrationWarning>
                  { children }
                </main>
              </div>
              <Footer />
            </div>
          </Provider>
      </body>
    </html>
  );
}
