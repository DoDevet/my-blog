import { Post } from "@/service/posts";
import Image from "next/image";
import Link from "next/link";

const Postcard = (post: Post) => {
  const slug = post.id;
  return (
    <div
      className="relative w-full transition-transform dark:bg-[#202023]
bg-[#fff9da] rounded-md shadow-md hover:scale-105"
    >
      <Link href={`/posts/${slug}`}>
        <Image
          key={post.id}
          src={post.image}
          alt={post.image}
          width={60}
          height={60}
          className="object-cover w-full rounded-t-md h-36"
        />
        <span className="absolute mt-1 text-xs text-gray-600 right-1 dark:text-gray-300">
          {post.date.toString()}
        </span>
        <section className="flex flex-col items-center justify-center py-5 space-y-3">
          <h1 className="text-sm font-semibold">{post.title}</h1>
          <h2 className="text-sm text-gray-600 dark:text-gray-300">
            {post.description}
          </h2>
          <span className="px-2 py-1 text-xs text-white bg-indigo-400 rounded-full">
            {post.category}
          </span>
        </section>
      </Link>
    </div>
  );
};

export default Postcard;
