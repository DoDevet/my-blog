"use client";
import { Post } from "@/service/posts";
import GridPosts from "../GridPosts";
import { useState } from "react";
import Categories from "../Categories";

const ALL_POSTS = "All Posts";
export default function FilterPosts({
  posts,
  categories,
}: {
  posts: Post[];
  categories: string[];
}) {
  const [selectedCategory, setSelectedCategory] = useState<string>(ALL_POSTS);
  const filteredPosts =
    selectedCategory === ALL_POSTS
      ? posts
      : posts.filter((post) => post.category === selectedCategory);

  const onClickCategory = (category: string) => setSelectedCategory(category);
  return (
    <section className="flex justify-center space-x-3">
      <GridPosts posts={filteredPosts} />
      <Categories
        categories={[ALL_POSTS, ...categories]}
        selectedCategory={selectedCategory}
        onClick={onClickCategory}
      />
    </section>
  );
}
