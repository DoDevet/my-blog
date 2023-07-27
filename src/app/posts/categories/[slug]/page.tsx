import GridPosts from "@/components/GridPosts";
import Postcard from "@/components/Postcard";
import { getPosts } from "@/service/posts";
import { Metadata } from "next";

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> => {
  const { slug: category } = params;

  return { title: category };
};

export default async function CategoriesPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug: category } = params;
  const posts = await getPosts({ category });

  return (
    <GridPosts>
      {posts.map((posts) => (
        <Postcard key={posts.id} {...posts} />
      ))}
    </GridPosts>
  );
}
