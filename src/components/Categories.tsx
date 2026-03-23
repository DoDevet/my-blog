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
    (pathname === "/posts" || pathname.includes("categories")) && (
      <section className="w-28 mt-3">
        <ul className="fixed w-28">
          <h2 className="pb-2 text-lg font-bold border-b border-gray-200 dark:border-gray-700">
            Categories
          </h2>
          <section className="flex flex-col py-3 space-y-2">
            {categories?.map((category, index) => (
              <Link
                href={index === 0 ? `/posts` : `/posts/categories/${category}`}
                className={cls(
                  "text-sm cursor-pointer transition-colors hover:text-sky-500 dark:hover:text-violet-400",
                  pathname.includes(category) ||
                    (pathname === "/posts" && index === 0)
                    ? "dark:text-violet-400 text-sky-500 font-semibold"
                    : "text-gray-500 dark:text-gray-400"
                )}
                key={index}
              >
                {category}
              </Link>
            ))}
          </section>
        </ul>
      </section>
    )
  );
};
export default Categories;
