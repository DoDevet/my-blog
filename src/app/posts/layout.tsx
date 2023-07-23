import Categories from "@/components/Categories";
import { getAllCategories } from "@/service/posts";
const ALL_POSTS = "All Posts";
export default async function PostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getAllCategories();
  return (
    <div className="flex space-x-4">
      <div className="flex flex-1 w-full">{children}</div>
      <Categories categories={[ALL_POSTS, ...categories]} />
    </div>
  );
}
