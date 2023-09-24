"use client";
import { ToCProps } from ".";
import TocList from "./TocList";

const DeskTopToC = ({ onClick, headings, activeId }: ToCProps) => {
  return (
    <section className="sticky hidden px-2 ml-3 text-sm top-32 xl:block">
      <nav className="absolute overflow-auto -right-52">
        <h1 className="py-2 my-2 text-lg font-semibold border-b">
          Table Of Contents
        </h1>
        <ul className="max-h-full pb-2 space-y-2 ">
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
                onClick={(e) => onClick(e, heading.id)}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
};

export default DeskTopToC;
