import "./globals.css";
import Navigation from "../components/Navigation";
import Providers from "./providers";
import { Inter, Noto_Sans_KR } from "next/font/google";
import { Metadata } from "next";
export const metadata = {
  title: {
    default: "Jihun's Blog",
    template: "Jihun's Blog | %s",
  },
  description: "프론트엔드 개발자",
  icons: {
    icon: "/favicon.ico",
  },
} as Metadata;

const inter = Inter({ subsets: ["latin"] });
const notosans = Noto_Sans_KR({
  weight: ["100", "300", "400", "500"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.className} ${notosans.className}`}>
      <head>
        <meta
          name="google-site-verification"
          content="ekI7vjDUhtGI6Bqsf_rKOO-TvGr7bl4oIcl_Hrgopmk"
        />
        <meta
          name="naver-site-verification"
          content="62ffeadf5d6fdc3b76b6be7cd03e54d3acc23686"
        />
      </head>
      <body className="dark:bg-[#202023] overflow-auto dark:text-white text-gray-800 bg-slate-50 flex flex-col w-full justify-center items-center min-h-screen">
        <Providers>
          <Navigation />
          <main className="w-full max-w-5xl px-5 mt-8 grow">{children}</main>
          <footer className="w-full mt-12 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-col items-center justify-center gap-2 py-6 text-sm text-gray-400">
              <p className="font-medium">Jihun&apos;s Blog</p>
              <p>© 2023 DoDevet. All rights reserved.</p>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
