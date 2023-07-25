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
  "group-hover:scale-125 w-9 h-9 p-1 group-hover:text-orange-500 rounded-full transition-colors transition-transform";
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
      className="relative w-full transition-transform bg-black group hover:scale-105"
    >
      <Image
        className="object-cover w-full opacity-30 max-h-32"
        src={image}
        width={1500}
        height={500}
        alt={image}
      />
      <div className="absolute flex items-center justify-around w-full px-3 text-white -translate-x-1/2 -translate-y-1/2 group top-1/2 left-1/2 ">
        {left && <AiOutlineLeft className={ICON_CLASS} />}
        <div className="w-full text-center">
          <h1 className="text-base font-semibold md:text-xl">{title}</h1>
          <p className="text-xs md:text-sm">{description}</p>
        </div>
        {!left && <AiOutlineRight className={ICON_CLASS} />}
      </div>
    </Link>
  );
}
