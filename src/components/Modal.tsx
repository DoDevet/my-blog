"use client";
import { router } from "@/constants";
import { cls } from "@/libs/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
const Modal = () => {
  const pathname = usePathname();
  return (
    <>
      <div className="fixed top-0 right-0 w-full h-screen" />
      <div className="absolute py-2 border md:hidden dark:bg-[#202023] bg-[#fff9da] border-gray-300 rounded-md shadow-md dark:border-zinc-700 top-16 w-48 right-2">
        <div className="flex flex-col space-y-1">
          {router.map(([href, name], index) => (
            <Link
              key={href}
              className={cls(
                "transition-colors hover:text-violet-400 dark:hover:bg-[#28282c] p-2",
                index !== 0 && pathname.startsWith(href)
                  ? "text-violet-400"
                  : index === 0 && pathname === href
                  ? "text-violet-400"
                  : ""
              )}
              href={href}
            >
              {name}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Modal;
