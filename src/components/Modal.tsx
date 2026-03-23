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
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.15 }}
        className="absolute py-2 md:hidden dark:bg-[#202023]/95 backdrop-blur-xl bg-white/95 border border-gray-200 dark:border-gray-800 rounded-xl shadow-lg top-16 w-48 right-2"
      >
        <div className="flex flex-col">
          {router.map(([href, name], index) => (
            <Link
              key={href}
              className={cls(
                "px-4 py-2.5 text-sm transition-colors hover:bg-gray-50 dark:hover:bg-gray-800",
                (index !== 0 && pathname.startsWith(href)) ||
                  (index === 0 && pathname === href)
                  ? "dark:text-violet-400 text-sky-500 font-medium"
                  : "text-gray-600 dark:text-gray-300"
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
