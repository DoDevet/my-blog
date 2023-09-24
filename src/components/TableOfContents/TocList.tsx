import { cls } from "@/libs/utils";
import { MouseEvent } from "react";

interface TocList {
  onClick: (e: MouseEvent<HTMLLIElement>) => void;
  id: string;
  activeId: string;
  level: string;
  text: string;
  mobile?: boolean;
}
const TocList = ({
  onClick,
  id,
  activeId,
  level,
  text,
  mobile = false,
}: TocList) => {
  return (
    <li
      id={mobile ? `list_${id}` : undefined}
      onClick={onClick}
      className={cls(
        "transition-colors cursor-pointer hover:text-sky-500 dark:hover:text-violet-400",
        activeId === id ? "text-sky-500 dark:text-violet-400" : "",
        `${level === "3" && "ml-2"} ${
          level === "4" && "ml-6 list-inside list-disc"
        }`
      )}
    >
      {text}
    </li>
  );
};

export default TocList;
