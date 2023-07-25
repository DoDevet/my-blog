import { getPostsDetail } from "@/service/posts";
import Image from "next/image";
import PostContent from "./PostContent";
import PostNavContainer from "./PostsNavContainer";

type PostDetailProps = {
  params: {
    slug: string;
  };
};

const PostDetail = async ({ params: { slug } }: PostDetailProps) => {
  const post = await getPostsDetail(slug);
  const { title, image, nextPost, prevPost } = post;

  return (
    <article className="w-full ">
      <Image
        className="w-full h-auto rounded-md shadow-md"
        src={image}
        priority
        alt={title}
        width={760}
        height={420}
      />

      <PostContent {...post} />
      <PostNavContainer nextPost={nextPost} prevPost={prevPost} />
    </article>
  );
};
export default PostDetail;
