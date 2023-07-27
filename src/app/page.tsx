import PostsForm from "@/components/PostsForm";
import Profile from "@/components/Profile";

export default function Home() {
  return (
    <>
      <Profile />
      <section className="space-y-7">
        <PostsForm title="Featured Posts" category={undefined} isFeatured />
        <PostsForm carousel isFeatured={false} title="You may be like" />
      </section>
    </>
  );
}
