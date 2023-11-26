"use client";
import { ToCProps } from ".";
import TocList from "./TocList";

const DeskTopToC = ({ onClick, headings, activeId }: ToCProps) => {
  return (
    <section className="sticky hidden px-2 ml-3 text-sm top-32 xl:block ">
      <nav className="absolute overflow-auto -right-52">
        <h1 className="py-2 my-2 text-lg font-semibold border-b">
          Table Of Contents
        </h1>
        <ul className="pb-2 space-y-2 overflow-y-auto h-[calc(100vh-200px)] ">
          {headings?.map((heading) => (
            <TocList
              onClick={(e) => {
                onClick(e, heading.id);
              }}
              activeId={activeId}
              {...heading}
              key={heading.id}
            />
          ))}
        </ul>
      </nav>
    </section>
  );
};

export default DeskTopToC;
