import useActiveToc from "@/hooks/useActiveToc";
import { MouseEvent, useEffect, useState } from "react";
import DeskTopToC from "./DesktopToC";
import MobileToc from "./MobileToc";

export interface IHeadings {
  text: string;
  level: string;
  id: string;
}
export interface ToCProps {
  onClick: (e: MouseEvent<HTMLAnchorElement>, id: string) => void;
  headings?: IHeadings[];
  activeId: string;
}
const TableOfContents = () => {
  const [headings, setHeadings] = useState<IHeadings[]>();
  const { activeId } = useActiveToc();

  const onClick = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.querySelector(`#${id}`)?.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    });
  };

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

  return (
    <>
      <DeskTopToC activeId={activeId} headings={headings} onClick={onClick} />
      <MobileToc activeId={activeId} headings={headings} onClick={onClick} />
    </>
  );
};

export default TableOfContents;
