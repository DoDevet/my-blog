import { Post } from "@/service/posts";
import Image from "next/image";
import Link from "next/link";

const Postcard = (post: Post) => {
  return (
    <div
      className="group relative w-full overflow-hidden dark:bg-[#2d2d2f] bg-white
        rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
    >
      <Link href={`/posts/${post.path}`}>
        <div className="overflow-hidden">
          <Image
            key={post.id}
            src={post.image}
            alt={post.image}
            width={700}
            height={700}
            className="object-cover w-full h-40 transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <section className="flex flex-col items-center justify-center px-4 py-5 space-y-2.5">
          <h1 className="text-sm font-bold text-gray-900 dark:text-white line-clamp-1">
            {post.title}
          </h1>
          <h2 className="text-xs text-center text-gray-500 dark:text-gray-400 line-clamp-2">
            {post.description}
          </h2>
          <div className="flex items-center justify-between w-full pt-2 border-t border-gray-100 dark:border-gray-700">
            <span className="text-xs text-gray-400">
              {post.date.toString()}
            </span>
            <span className="px-2.5 py-0.5 text-xs font-medium text-white truncate bg-gradient-to-r from-sky-500 to-indigo-500 dark:from-violet-500 dark:to-fuchsia-500 rounded-full">
              {post.category}
            </span>
          </div>
        </section>
      </Link>
    </div>
  );
};

export default Postcard;
