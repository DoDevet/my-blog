import path from "path";
import { promises as fs, readFile } from "fs";

export interface getPostsProps {
  isFeatured?: boolean;
  category?: string;
}

export interface Post {
  id: number;
  title: string;
  description: string;
  category: string;
  date: Date;
  path: string;
  image: string;
  featured: boolean;
}

export const getPosts = async ({
  category,
  isFeatured,
}: getPostsProps): Promise<Post[]> => {
  const filePath = path.join(process.cwd(), "data", "posts.json");
  const data = await fs.readFile(filePath, "utf-8");
  let posts: Post[] = JSON.parse(data);

  if (isFeatured !== undefined) {
    posts = posts.filter((post) => post.featured === isFeatured);
  }
  if (category) {
    posts = posts.filter((post) => post.category === category);
  }
  return posts;
};

export const getAllCategories = async () => {
  const posts = await getPosts({});
  const categories = [...new Set(posts.map((post) => post.category))];

  return categories;
};

export const getPostsDetail = async (postPath: string) => {
  const filePath = path.join(process.cwd(), "data", "posts", `${postPath}.md`);
  const posts = await getPosts({});
  const index = posts.findIndex((prev) => prev.path === postPath);

  if (!posts) throw new Error(`${postPath} Not Found`);
  const content = await fs.readFile(filePath, "utf-8");
  return {
    ...posts[index],
    content,
    nextPost: posts[index + 1],
    prevPost: posts[index - 1],
  };
};
