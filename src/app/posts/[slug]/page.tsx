import { getPostsDetail } from "@/service/posts";
import Image from "next/image";
import PostContent from "./PostContent";
import PostNav from "./PostNav";

type PostDetailProps = {
  params: {
    slug: string;
  };
};

const PostDetail = async ({ params: { slug } }: PostDetailProps) => {
  const post = await getPostsDetail(slug);
  const { title, image, nextPost, prevPost } = post;

  return (
    <article className="w-full">
      <Image
        className="w-full h-auto rounded-md shadow-md"
        src={image}
        priority
        alt={title}
        width={760}
        height={420}
      />

      <PostContent {...post} />
      <nav className="flex items-center py-4 space-x-4">
        {prevPost && <PostNav left {...prevPost} />}
        {nextPost && <PostNav {...nextPost} />}
      </nav>
    </article>
  );
};
export default PostDetail;
