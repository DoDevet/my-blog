import Divider from "@/components/Divider";
import MarkdownViewer from "@/components/posts/MarkdownViewer";
import { AiTwotoneCalendar } from "react-icons/ai";

interface IPostContent {
  date: Date;
  title: string;
  description: string;
  content: string;
}

export default function PostContent({
  content,
  date,
  description,
  title,
}: IPostContent) {
  return (
    <section>
      <h1 className="mb-1 text-4xl font-bold">{title}</h1>
      <div className="flex items-center justify-between w-full">
        <p className="text-xl text-gray-600 dark:text-gray-300">
          {description}
        </p>
        <div className="flex items-center justify-end space-x-3 font-semibold text-gray-500 dark:text-gray-300 ">
          <AiTwotoneCalendar />
          <p>{date.toString()}</p>
        </div>
      </div>
      <Divider />
      <MarkdownViewer content={content} />
    </section>
  );
}
