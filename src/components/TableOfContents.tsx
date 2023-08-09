"use client";
import { useEffect, useState } from "react";

interface IHeadings {
  text: string;
  level: string;
  id: string;
}
const TableOfContents = () => {
  const [headings, setHeadings] = useState<IHeadings[]>();
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll("h2, h3, h4")).map(
      (elem) => {
        elem.id = elem.innerHTML.replaceAll(/[0-9. ]/g, "");
        return {
          id: elem.id,
          text: elem.innerHTML,
          level: elem.nodeName.charAt(1),
        };
      }
    );
    setHeadings(elements);
  }, []);
  return (
    <section className="hidden px-2 ml-3 text-sm xl:block">
      <ul className="fixed space-y-2 top-36">
        {headings?.map((heading) => (
          <li
            key={heading.id}
            className={`${heading.level === "3" && "ml-2"} ${
              heading.level === "4" && "ml-6 list-inside list-disc"
            }`}
          >
            <a
              href={`#${heading.id}`}
              className="transition-colors hover:text-violet-400"
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
  );
};

export default TableOfContents;
