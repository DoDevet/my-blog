import path from "path";
import { promises as fs } from "fs";

interface getPostsProps {
  isFeatured?: boolean;
  category?: string;
}

export interface Post {
  id: number;
  title: string;
  description: string;
  category: string;
  date: Date;
  image: string;
  featured: boolean;
}

export const getPosts = async (
  category?: string,
  isFeatured?: boolean
): Promise<Post[]> => {
  const filePath = path.join(process.cwd(), "data", "posts.json");
  const data = await fs.readFile(filePath, "utf-8");
  let posts: Post[] = JSON.parse(data);

  if (isFeatured === false || isFeatured === true) {
    posts = posts.filter((post) => post.featured === isFeatured);
  }
  if (category) {
    posts = posts.filter((post) => post.category === category);
  }

  return posts;
};
