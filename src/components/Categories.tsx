"use client";
import { cls } from "@/libs/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface CategoriesProps {
  categories: string[];
}

const Categories = ({ categories }: CategoriesProps) => {
  const pathname = usePathname();
  return (
    <section
      className={`w-24 mt-3 ${
        pathname.includes("categories") || pathname === "/posts"
          ? "block"
          : "hidden"
      }`}
    >
      <ul className="fixed w-24">
        <h1 className="pb-2 text-xl font-semibold border-b border-gray-700 dark:border-gray-300">
          Categories
        </h1>
        <section className="flex flex-col py-2 space-y-1">
          {categories?.map((category, index) => (
            <Link
              href={index === 0 ? `/posts` : `/posts/categories/${category}`}
              className={cls(
                "cursor-pointer hover:text-indigo-400 transition-colors",
                pathname.includes(category) ||
                  (pathname === "/posts" && index === 0)
                  ? "text-indigo-400"
                  : ""
              )}
              key={index}
            >
              {category}
            </Link>
          ))}
        </section>
      </ul>
    </section>
  );
};
export default Categories;
