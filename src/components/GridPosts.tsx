import { Post } from "@/service/posts";
import Postcard from "./Postcard";
import "react-multi-carousel/lib/styles.css";

export default function GridPosts({ posts }: { posts: Post[] }) {
  return (
    <>
      <div className="grid grid-cols-2 gap-3 px-1 py-3 md:grid-cols-3 2xl:grid-cols-4">
        {posts.map((post) => (
          <Postcard key={post.id} {...post} />
        ))}
      </div>
    </>
  );
}
