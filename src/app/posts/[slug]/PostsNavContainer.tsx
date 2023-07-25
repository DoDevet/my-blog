import { Post } from "@/service/posts";
import PostNav from "./PostNav";

interface PostNav {
  nextPost: Post | undefined;
  prevPost: Post | undefined;
}

export default function PostNavContainer({
  nextPost,
  prevPost,
}: {
  nextPost: Post;
  prevPost: Post;
}) {
  return (
    <nav className="relative flex items-center w-full space-x-4">
      {prevPost && <PostNav left {...prevPost} />}
      {nextPost && <PostNav {...nextPost} />}
    </nav>
  );
}
