"use client";
import Link from "next/link";
import NavMenu from "./NavMenu";
import DarkMode from "./DarkMode";
import { usePathname } from "next/navigation";
import { cls } from "@/libs/utils";
import { router } from "@/constants";
import { LiaBlogSolid } from "react-icons/lia";
export default function Navigation() {
  const pathname = usePathname();
  return (
    <div className="fixed top-0 right-0 z-10 flex items-center justify-center w-full px-3 shadow-md md:px-32 backdrop-blur-lg">
      <div className="flex items-center justify-between w-full py-4 max-w-7xl">
        <Link
          href="/"
          className="flex items-center text-xl font-semibold group"
        >
          <LiaBlogSolid className="w-6 h-6 transition-transform group-hover:motion-safe:animate-bounce" />
          {`Jihun's Blog`}
        </Link>

        <ul className="hidden space-x-7 md:block">
          {router.map(([href, name], index) => (
            <Link
              href={href}
              key={href}
              className={cls(
                "transition-colors dark:hover:text-violet-400 hover:text-sky-500",
                index !== 0 && pathname.startsWith(href)
                  ? "dark:text-violet-400 text-sky-500"
                  : index === 0 && pathname === href
                  ? "dark:text-violet-400 text-sky-500"
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
