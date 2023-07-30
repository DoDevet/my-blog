import "./globals.css";
import Navigation from "../components/Navigation";
import Providers from "./providers";

export const metadata = {
  title: {
    default: "Jihun's Blog",
    template: "Jihun's Blog | %s",
  },
  description: "프론트엔드 개발자",
  icons: {
    icon: "/favicon.ico",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="SZe-B-MuwhUmCrPkbBN_G7xoDyN06MUogrEG5MgWYZU"
        />
        <meta
          name="naver-site-verification"
          content="62ffeadf5d6fdc3b76b6be7cd03e54d3acc23686"
        />
      </head>
      <body className="dark:bg-[#202023] dark:text-white py-2 text-gray-800 bg-[#fff9da] flex flex-col w-full justify-center items-center">
        <Providers>
          <Navigation />
          <main className="w-full max-w-5xl px-5 pt-20 grow">{children}</main>
          <footer className="pt-4 text-sm text-gray-400">© 2023 DoDevet</footer>
        </Providers>
      </body>
    </html>
  );
}
