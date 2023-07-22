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
  const { title, content, image } = await getPostsDetail(slug);

  return (
    <article>
      <Image
        className="w-auto h-auto"
        src={image}
        priority
        alt={title}
        width={760}
        height={420}
      />
      <AiTwotoneCalendar />
      <section>
        <h1>{title}</h1>
        <MarkdownViewer content={content} />
      </section>
    </article>
  );
};
export default PostDetail;
