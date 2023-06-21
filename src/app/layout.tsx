import Navigation from "../components/Navigation";
import "./globals.css";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#202023] text-white">
        <Navigation>
          <div className="flex items-center w-full max-w-4xl px-8">
            {children}
          </div>
        </Navigation>
      </body>
    </html>
  );
}
