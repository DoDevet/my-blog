"use client";
import Link from "next/link";
import NavMenu from "./NavMenu";
import DarkMode from "./DarkMode";
import { usePathname } from "next/navigation";
import { cls } from "@/libs/utils";
import { router } from "@/constants";

export default function Navigation() {
  const pathname = usePathname();
  return (
    <div className="fixed top-0 right-0 z-10 flex items-center justify-center w-full px-3 shadow-md md:px-36 backdrop-blur-lg">
      <div className="flex items-center justify-between w-full py-4 max-w-7xl">
        <Link href="/" className="text-xl font-semibold hover:animate-pulse">
          {`DOZI's Blog`}
        </Link>

        <ul className="hidden space-x-7 md:block">
          {router.map(([href, name], index) => (
            <Link
              href={href}
              key={href}
              className={cls(
                "transition-colors hover:text-indigo-400",
                index !== 0 && pathname.startsWith(href)
                  ? "text-indigo-400"
                  : index === 0 && pathname === href
                  ? "text-indigo-400"
                  : ""
              )}
            >
              {name}
            </Link>
          ))}
        </ul>
      </div>
      <div className="flex ml-16 space-x-2">
        <DarkMode />
        <NavMenu />
      </div>
    </div>
  );
}
