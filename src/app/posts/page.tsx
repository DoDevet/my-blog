import GridPosts from "@/components/GridPosts";
import Postcard from "@/components/Postcard";

import { getPosts } from "@/service/posts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Posts",
  description: "Jihun's Posts",
};

const PostPage = async () => {
  const posts = await getPosts({});
  return (
    <GridPosts>
      {posts.map((posts) => (
        <Postcard key={posts.id} {...posts} />
      ))}
    </GridPosts>
  );
};
export default PostPage;
