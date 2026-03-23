import Image from "next/image";
import Link from "next/link";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
interface IPostNav {
  path: string;
  image: string;
  title: string;
  description: string;
  left?: boolean;
}
const ICON_CLASS =
  "group-hover:scale-110 w-8 h-8 p-1 transition-transform shrink-0";
export default function PostNav({
  description,
  image,
  path,
  title,
  left,
}: IPostNav) {
  return (
    <Link
      href={`/posts/${path}`}
      className="relative w-full overflow-hidden bg-black rounded-xl shadow-md group hover:shadow-lg transition-shadow"
    >
      <Image
        className="object-cover w-full opacity-40 max-h-24 transition-transform duration-500 group-hover:scale-110"
        src={image}
        width={1500}
        height={500}
        alt={image}
      />
      <div className="absolute flex items-center justify-around w-full px-4 text-white -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        {left && <AiOutlineLeft className={ICON_CLASS} />}
        <div className="w-full text-center">
          <h3 className="text-sm font-bold md:text-lg line-clamp-1">{title}</h3>
          <p className="text-xs md:text-sm opacity-80 line-clamp-1">{description}</p>
        </div>
        {!left && <AiOutlineRight className={ICON_CLASS} />}
      </div>
    </Link>
  );
}
