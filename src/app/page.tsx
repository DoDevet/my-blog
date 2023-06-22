import FeaturedPosts from "@/components/Home/FeaturedPosts";
import HomeProfile from "@/components/Home/profile";

export default function Home() {
  return (
    <section className="space-y-7">
      <HomeProfile />
      <FeaturedPosts />
    </section>
  );
}
