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
      <div className="absolute h-auto px-2 py-2 space-y-10 bg-transparent border bg-[#202023] border-gray-300 rounded-md shadow-md dark:border-zinc-500 top-14 w-36 right-4">
        <div className="flex flex-col space-y-2">
          {router.map(([href, name]) => (
            <Link
              key={href}
              className={cls(
                "transition-colors",
                pathname === href ? "text-indigo-400" : "hover:text-indigo-400"
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
