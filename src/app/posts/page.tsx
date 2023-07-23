import FilterPosts from "@/components/posts/FilterPosts";
import { getAllCategories, getPosts } from "@/service/posts";

const PostPage = async () => {
  const posts = await getPosts({});
  const categories = await getAllCategories();
  return <FilterPosts posts={posts} categories={categories} />;
};
export default PostPage;
