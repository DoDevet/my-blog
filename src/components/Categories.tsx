import { cls } from "@/libs/utils";

interface CategoriesProps {
  categories: string[];
  selectedCategory: string;
  onClick: (category: string) => void;
}

const Categories = ({
  categories,
  onClick,
  selectedCategory,
}: CategoriesProps) => {
  return (
    <section className="w-24 mt-3">
      <ul className="fixed w-24">
        <h1 className="pb-2 text-xl font-semibold border-b border-gray-700 dark:border-gray-300">
          Categories
        </h1>
        <section className="py-2 space-y-1">
          {categories?.map((category, index) => (
            <li
              className={cls(
                "cursor-pointer hover:text-indigo-400 transition-colors",
                selectedCategory === category ? "text-indigo-400" : ""
              )}
              key={index}
              onClick={() => onClick(category)}
            >
              {category}
            </li>
          ))}
        </section>
      </ul>
    </section>
  );
};
export default Categories;
