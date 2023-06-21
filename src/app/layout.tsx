import "./globals.css";
import Navigation from "../components/Navigation";
import Providers from "./providers";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="dark:bg-[#202023]">
        <Providers>
          <Navigation>
            <div className="flex items-center w-full max-w-4xl px-8">
              {children}
            </div>
          </Navigation>
        </Providers>
      </body>
    </html>
  );
}
