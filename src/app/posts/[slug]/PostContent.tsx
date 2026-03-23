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
    <section className="mt-6">
      <h1 className="mb-2 text-3xl font-bold tracking-tight md:text-4xl">{title}</h1>
      <div className="flex items-center justify-between w-full">
        <p className="text-sm text-gray-500 sm:text-base dark:text-gray-400">
          {description}
        </p>
        <div className="flex items-center gap-1.5 text-xs font-medium text-gray-400 sm:text-sm dark:text-gray-500">
          <AiTwotoneCalendar />
          <p>{date.toString()}</p>
        </div>
      </div>
      <Divider />
      <MarkdownViewer content={content} />
    </section>
  );
}
