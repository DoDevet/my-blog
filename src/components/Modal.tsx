"use client";
import { router } from "@/constants";
import { cls } from "@/libs/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
const Modal = () => {
  const pathname = usePathname();
  return (
    <>
      <div className="fixed top-0 right-0 w-full h-screen" />
      <motion.div
        initial={{ y: -20, x: 20, opacity: 0 }}
        animate={{ y: 0, x: 0, opacity: 1 }}
        exit={{ y: -20, x: 0, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="absolute py-2 border md:hidden dark:bg-[#202023] backdrop-blur-2xl bg-white border-gray-300 rounded-md shadow-md dark:border-zinc-700 top-16 w-48 right-2"
      >
        <div className="flex flex-col space-y-1">
          {router.map(([href, name], index) => (
            <Link
              key={href}
              className={cls(
                "transition-colors dark:hover:text-violet-400 hover:text-sky-500 dark:hover:bg-[#28282c] p-2",
                index !== 0 && pathname.startsWith(href)
                  ? "dark:text-violet-400 text-sky-500"
                  : index === 0 && pathname === href
                  ? "dark:text-violet-400 text-sky-500"
                  : ""
              )}
              href={href}
            >
              {name}
            </Link>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default Modal;
