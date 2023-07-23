import MarkdownViewer from "@/components/posts/MarkdownViewer";
import { getPostsDetail } from "@/service/posts";
import Image from "next/image";
import { AiTwotoneCalendar } from "react-icons/ai";
type PostDetailProps = {
  params: {
    slug: string;
  };
};

const PostDetail = async ({ params: { slug } }: PostDetailProps) => {
  const { title, description, content, image, date } = await getPostsDetail(
    slug
  );

  return (
    <article className="w-full max-w-4xl">
      <Image
        className="w-full h-auto rounded-md shadow-md"
        src={image}
        priority
        alt={title}
        width={760}
        height={420}
      />

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
    </article>
  );
};
export default PostDetail;
