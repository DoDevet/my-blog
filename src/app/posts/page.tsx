import GridPosts from "@/components/GridPosts";
import Postcard from "@/components/Postcard";

import { getPosts } from "@/service/posts";

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
