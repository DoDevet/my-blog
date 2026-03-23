import { getPosts, getPostsDetail } from "@/service/posts";
import Image from "next/image";
import PostContent from "./PostContent";
import PostNav from "./PostNav";
import { Metadata } from "next";

type PostDetailProps = {
  params: {
    slug: string;
  };
};

export const generateMetadata = async ({
  params: { slug },
}: PostDetailProps): Promise<Metadata> => {
  const { title, description } = await getPostsDetail(slug);
  return { title, description };
};

const PostDetail = async ({ params: { slug } }: PostDetailProps) => {
  const post = await getPostsDetail(slug);
  const { title, image, nextPost, prevPost } = post;

  return (
    <article className="w-full">
      <div className="overflow-hidden rounded-xl shadow-md">
        <Image
          className="w-full h-auto"
          src={image}
          priority
          alt={title}
          width={760}
          height={420}
        />
      </div>

      <PostContent {...post} />
      <nav className="flex items-center py-6 gap-4">
        {prevPost && <PostNav left {...prevPost} />}
        {nextPost && <PostNav {...nextPost} />}
      </nav>
    </article>
  );
};
export default PostDetail;
export const generateStaticParams = async () => {
  const posts = await getPosts({});
  return posts.map((post) => ({
    slug: post.path,
  }));
};
