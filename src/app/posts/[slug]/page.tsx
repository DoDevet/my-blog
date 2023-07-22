import { getPostsDetail } from "@/service/posts";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

type PostDetailProps = {
  params: {
    slug: string;
  };
};

const PostDetail = async ({ params: { slug } }: PostDetailProps) => {
  const post = await getPostsDetail(slug);

  return <ReactMarkdown>{post.postDetail}</ReactMarkdown>;
};
export default PostDetail;
