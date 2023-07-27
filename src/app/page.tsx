import PostsForm from "@/components/PostsForm";
import Profile from "@/components/Profile";

export default function Home() {
  return (
    <section className="space-y-7">
      <Profile />
      <PostsForm title="Featured Posts" category={undefined} isFeatured />
      <PostsForm carousel isFeatured={false} title="You may be like" />
    </section>
  );
}
