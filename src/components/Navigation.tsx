"use client";
import Link from "next/link";
import NavMenu from "./NavMenu";
import DarkMode from "./DarkMode";
import { usePathname } from "next/navigation";
import { cls } from "@/libs/utils";
import { router } from "@/constants";
import { LiaBlogSolid } from "react-icons/lia";
import { useEffect, useState } from "react";

export default function Navigation() {
  const pathname = usePathname();
  const [scrollDown, setScrollDown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollEvent = document.documentElement.scrollTop;
      setScrollDown(scrollEvent > 0 ? true : false);
    };
    if (
      pathname.includes("/posts") &&
      pathname.replaceAll("/posts", "").length > 0
    ) {
      window.addEventListener("scroll", handleScroll);
    }
    return () => {
      setScrollDown(false);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-10 flex items-center w-full px-4 md:px-32 border-b transition-all duration-300 ${
        scrollDown
          ? "delay-300 dark:bg-[#202023]/95 bg-white/95 border-gray-200 dark:border-gray-800"
          : "backdrop-blur-lg border-transparent"
      }`}
    >
      <div className="flex items-center justify-between w-full py-3 mx-auto max-w-7xl">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold group"
        >
          <LiaBlogSolid className="w-7 h-7 text-sky-500 dark:text-violet-400 transition-transform group-hover:motion-safe:animate-bounce" />
          <span className="whitespace-nowrap bg-gradient-to-r from-sky-500 to-indigo-500 dark:from-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent">
            {`Jihun's Blog`}
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {router.map(([href, name], index) => (
            <Link
              href={href}
              key={href}
              className={cls(
                "relative py-1 text-sm font-medium transition-colors dark:hover:text-violet-400 hover:text-sky-500",
                (index !== 0 && pathname.startsWith(href)) ||
                  (index === 0 && pathname === href)
                  ? "dark:text-violet-400 text-sky-500 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-sky-500 dark:after:bg-violet-400 after:rounded-full"
                  : "text-gray-600 dark:text-gray-300"
              )}
            >
              {name}
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex ml-8 items-center gap-2">
        <DarkMode />
        <NavMenu />
      </div>
    </header>
  );
}
