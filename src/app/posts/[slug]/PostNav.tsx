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
      className="relative z-0 flex w-full overflow-hidden transition-transform md:max-h-48 max-h-32 hover:scale-105"
    >
      <div className="absolute z-10 w-full h-full bg-black opacity-50" />
      <Image
        className="object-cover w-full h-full "
        src={image}
        width={1200}
        height={500}
        alt={image}
      />
      <section className="absolute z-20 flex items-center justify-center w-full h-full text-white">
        {left && (
          <AiOutlineLeft className="absolute w-8 h-8 p-1 bg-orange-400 rounded-full left-2" />
        )}
        <div className="">
          <h1 className="text-lg font-semibold">{title}</h1>
          <p className="text-sm">{description}</p>
        </div>
        {!left && (
          <AiOutlineRight className="absolute w-8 h-8 p-1 bg-orange-400 rounded-full right-2" />
        )}
      </section>
    </Link>
  );
}
