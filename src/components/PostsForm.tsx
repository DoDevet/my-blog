import CarouselPosts from "./CarouselPosts";
import GridPosts from "./GridPosts";
import { getPosts, getPostsProps } from "@/service/posts";
import Postcard from "./Postcard";

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
  const posts = await getPosts({ category, isFeatured });

  return (
    <section className="space-y-4">
      {title ? (
        <div className="flex items-center gap-3">
          <div className="w-1 h-7 rounded-full bg-gradient-to-b from-sky-500 to-indigo-500 dark:from-violet-400 dark:to-fuchsia-500" />
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        </div>
      ) : null}
      {carousel ? (
        <CarouselPosts>
          {posts.map((post) => (
            <Postcard key={post.id} {...post} />
          ))}
        </CarouselPosts>
      ) : (
        <GridPosts>
          {posts.map((post) => (
            <Postcard key={post.id} {...post} />
          ))}
        </GridPosts>
      )}
    </section>
  );
};

export default PostsForm;
