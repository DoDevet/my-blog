"use client";
import useActiveToc from "@/hooks/useActiveToc";
import { cls } from "@/libs/utils";
import { useEffect, useState } from "react";
import { RiMenuUnfoldLine, RiCloseLine } from "react-icons/ri";
import { AnimatePresence, motion } from "framer-motion";
interface IHeadings {
  text: string;
  level: string;
  id: string;
}
const TableOfContents = () => {
  const [headings, setHeadings] = useState<IHeadings[]>();
  const [open, setOpen] = useState(false);
  const { activeId } = useActiveToc();

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll("h2, h3, h4")).map(
      (elem) => {
        elem.id = elem.innerHTML.replaceAll(/[0-9. ()]/g, "");
        return {
          id: elem.id,
          text: elem.innerHTML,
          level: elem.nodeName.charAt(1),
        };
      }
    );
    setHeadings(elements);
  }, []);

  useEffect(() => {
    if (open) {
      document.querySelector(`#list_${activeId}`)?.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [open]);

  return (
    <>
      <section className="sticky hidden px-2 ml-3 text-sm top-32 xl:block">
        <ul className="absolute space-y-2 -right-52">
          {headings?.map((heading) => (
            <li
              key={heading.id}
              className={`${heading.level === "3" && "ml-2"} ${
                heading.level === "4" && "ml-6 list-inside list-disc"
              }`}
            >
              <a
                href={`#${heading.id}`}
                className={cls(
                  "transition-colors hover:text-sky-500 dark:hover:text-violet-400",
                  activeId === heading.id
                    ? "text-sky-500 dark:text-violet-400"
                    : ""
                )}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(`#${heading.id}`)?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                    inline: "nearest",
                  });
                }}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </section>
      <section className="sticky right-0 block text-sm top-32 xl:hidden">
        {open && (
          <div
            onClick={() => setOpen((prev) => !prev)}
            className="fixed top-0 bottom-0 left-0 right-0 bg-black opacity-20"
          />
        )}
        <button
          onClick={() => setOpen((prev) => !prev)}
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
              className="absolute border overflow-x-hidden  dark:border-gray-500 space-y-2 overflow-auto dark:bg-[#202023] bg-white right-0 h-48 px-2 py-2 rounded-md shadow-md top-12 w-52"
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
                      e.preventDefault();
                      document.querySelector(`#${heading.id}`)?.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                        inline: "nearest",
                      });
                      setOpen((prev) => !prev);
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
    </>
  );
};

export default TableOfContents;
