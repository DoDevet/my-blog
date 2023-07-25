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
      <div className="flex items-center justify-end space-x-3 font-semibold text-gray-500 dark:text-gray-300 ">
        <AiTwotoneCalendar />
        <p>{date.toString()}</p>
      </div>
      <h1 className="text-4xl font-bold">{title}</h1>
      <p className="mb-3 text-xl text-gray-600 dark:text-gray-300">
        {description}
      </p>
      <div className="w-full bg-white border-b border-gray-600 dark:border-gray-300 " />
      <MarkdownViewer content={content} />
    </section>
  );
}
