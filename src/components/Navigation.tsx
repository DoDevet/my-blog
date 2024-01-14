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
      className={`sticky top-0 z-10 flex items-center w-full px-3 shadow-md ig md:px-32 transition-all ${
        scrollDown
          ? "delay-300 dark:bg-[#202023] bg-white"
          : " backdrop-blur-lg"
      }`}
    >
      <div className="flex items-center justify-between w-full py-4 mx-auto max-w-7xl">
        <Link
          href="/"
          className="flex items-center text-xl font-semibold group"
        >
          <LiaBlogSolid className="w-6 h-6 transition-transform group-hover:motion-safe:animate-bounce" />
          <p className="pr-4 whitespace-nowrap"> {`Jihun's Blog`}</p>
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
    </header>
  );
}
