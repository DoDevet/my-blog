import Link from "next/link";
import NavMenu from "./NavMenu";
import DarkMode from "./DarkMode";
export default function Navigation() {
  return (
    <>
      <div className="fixed top-0 right-0 z-10 flex items-center justify-center w-full px-3 shadow-md md:px-36 backdrop-blur-sm">
        <div className="flex items-center justify-between w-full py-6 max-w-7xl">
          <>
            <Link
              href="/"
              className="text-xl font-semibold hover:animate-pulse"
            >
              {`DOZI's Blog`}
            </Link>
          </>
          <div className="hidden space-x-7 md:block">
            <Link href="/">home</Link>
            <Link href="/about">about</Link>
            <Link href="/posts">posts</Link>
            <Link href="/contact">contact</Link>
          </div>
        </div>
        <div className="flex ml-16 space-x-2">
          <DarkMode />
          <NavMenu />
        </div>
      </div>
    </>
  );
}
