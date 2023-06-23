import { getPosts } from "@/service/posts";
import Postcard from "../Postcard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import YouMayLikePosts from "./Youmaylike";

export default async function FeaturedPosts() {
  const featuredPosts = await getPosts(undefined, true);
  const youMayLikePosts = await getPosts(undefined, false);
  return (
    <>
      <p className="text-2xl font-bold ">FeaturedPosts</p>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 2xl:grid-cols-4">
        {featuredPosts.map((post) => (
          <Postcard key={post.id} {...post} />
        ))}
      </div>
      <p className="text-2xl font-bold">You may like</p>
      <YouMayLikePosts posts={...youMayLikePosts} />
    </>
  );
}
