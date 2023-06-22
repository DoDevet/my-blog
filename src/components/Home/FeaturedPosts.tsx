import { getPosts } from "@/service/posts";
import Image from "next/image";
import Postcard from "../Postcard";

export default async function FeaturedPosts() {
  const posts = await getPosts(undefined, true);
  return (
    <>
      <p className="text-2xl font-bold ">FeaturedPosts</p>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 2xl:grid-cols-4">
        {posts.map((post) => (
          <Postcard key={post.id} {...post} />
        ))}
      </div>
    </>
  );
}
