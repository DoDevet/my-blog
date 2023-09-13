"use client";
import { cls } from "@/libs/utils";
import { ToCProps } from ".";

const DeskTopToC = ({ onClick, headings, activeId }: ToCProps) => {
  return (
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
              onClick={(e) => onClick(e, heading.id)}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default DeskTopToC;
