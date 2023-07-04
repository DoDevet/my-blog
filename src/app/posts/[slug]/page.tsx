import { getPostsDetail } from "@/service/posts";

type PostDetailProps = {
  params: {
    slug: string;
  };
};

const PostDetail = async ({ params: { slug } }: PostDetailProps) => {
  const data = await getPostsDetail(slug);

  return (
    <>
      <h1>{data.title}</h1>
      <pre>{data.postDetail}</pre>
    </>
  );
};
export default PostDetail;
