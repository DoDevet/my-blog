import Link from "next/link";

import NavMenu from "./NavMenu";
import DarkMode from "./DarkMode";
export default function Navigation({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="relative flex items-center justify-center w-full px-5">
        <div className="flex items-center justify-between w-full py-6 max-w-7xl">
          <>
            <Link href="/" className="text-xl font-semibold ">
              Jihun's Blog
            </Link>
          </>
          <div className="hidden space-x-7 md:block">
            <Link href="/">home</Link>
            <Link href="/about">about</Link>
            <Link href="/posts">posts</Link>
            <Link href="/contact">contact</Link>
          </div>
        </div>
        <div className="flex ml-5 space-x-2">
          <DarkMode />
          <NavMenu />
        </div>
      </div>
      <div className="flex items-center justify-center">{children}</div>
    </>
  );
}
