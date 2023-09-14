import { cls } from "@/libs/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { RiCloseLine, RiMenuUnfoldLine } from "react-icons/ri";
import { ToCProps } from ".";

const MobileToc = ({ onClick, headings, activeId }: ToCProps) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (open) {
      document.querySelector(`#list_${activeId}`)?.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [open]);
  const toggleOpen = () => {
    setOpen((prev) => !prev);
  };
  return (
    <section className="sticky right-0 block text-sm top-32 xl:hidden">
      {open && (
        <div
          onClick={toggleOpen}
          className="fixed top-0 bottom-0 left-0 right-0 bg-black opacity-20"
        />
      )}
      <button
        onClick={toggleOpen}
        className="absolute right-0 px-3 py-3 text-white transition-colors rounded-full bg-sky-400 hover:bg-sky-500 focus:bg-sky-500 dark:hover:bg-violet-500 dark:focus:bg-violet-500 active:shadow-inner dark:bg-violet-400"
      >
        {open ? <RiCloseLine /> : <RiMenuUnfoldLine />}
      </button>
      <AnimatePresence initial={false} mode="wait">
        {open ? (
          <motion.ul
            initial={{ y: -30 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ duration: 0.3, type: "spring" }}
            className="absolute border overflow-x-hidden  dark:border-gray-500 space-y-2 overflow-auto dark:bg-[#202023] bg-white right-0 max-h-48 px-2 py-2 rounded-md shadow-md top-12 w-52"
          >
            {headings?.map((heading) => (
              <li
                key={heading.id}
                className={`${heading.level === "3" && "ml-2"} ${
                  heading.level === "4" && "ml-6 list-inside list-disc"
                }`}
              >
                <a
                  id={`list_${heading.id}`}
                  href={`#${heading.id}`}
                  className={cls(
                    "transition-colors hover:text-sky-500 dark:hover:text-violet-400",
                    activeId === heading.id
                      ? "text-sky-500 dark:text-violet-400"
                      : ""
                  )}
                  onClick={(e) => {
                    onClick(e, heading.id);
                    toggleOpen();
                  }}
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </section>
  );
};
export default MobileToc;
