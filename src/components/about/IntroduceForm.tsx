import { cls } from "@/libs/utils";
import Image, { StaticImageData } from "next/image";

interface IntroduceProps {
  title: string;
  description?: string | string[];
  image?: string | StaticImageData | undefined;
  imageHeight?: number;
  children?: React.ReactNode;
}

const IntroduceForm = ({
  title,
  description,
  image,
  imageHeight,
  children,
}: IntroduceProps) => {
  return (
    <div
      className={cls(
        "mx-auto",
        children !== undefined ? "w-full" : "-space-y-0.5 text-center"
      )}
    >
      <div className="flex items-center justify-center gap-2 mb-2">
        <div className="w-8 h-0.5 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 dark:from-violet-400 dark:to-fuchsia-500" />
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        <div className="w-8 h-0.5 rounded-full bg-gradient-to-r from-indigo-500 to-sky-500 dark:from-fuchsia-500 dark:to-violet-400" />
      </div>
      {image && (
        <Image
          src={image}
          alt={title}
          className={cls(
            `object-contain`,
            imageHeight ? `h-${imageHeight}` : "h-52"
          )}
        />
      )}
      {Array.isArray(description) ? (
        description.map((description) => (
          <p key={description} className="text-gray-600 dark:text-gray-300">
            {description}
          </p>
        ))
      ) : (
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      )}
      {children}
    </div>
  );
};

export default IntroduceForm;
