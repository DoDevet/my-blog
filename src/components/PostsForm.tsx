import CarouselPosts from "./CarouselPosts";
import GridPosts from "./GridPosts";
import { getPosts, getPostsProps } from "@/service/posts";

export interface PostsProps extends getPostsProps {
  carousel?: boolean;
  title?: string | undefined;
}

const PostsForm = async ({
  title,
  category,
  isFeatured,
  carousel,
}: PostsProps) => {
  const posts = await getPosts(category, isFeatured);
  return (
    <section>
      {title ? <h1 className="text-2xl font-bold ">{title}</h1> : null}
      {carousel ? <CarouselPosts posts={posts} /> : <GridPosts posts={posts} />}
    </section>
  );
};

export default PostsForm;
