import { cls } from "@/libs/utils";
import Image, { StaticImageData } from "next/image";

interface IntroduceProps {
  title: string;
  description?: string | string[];
  image?: string | StaticImageData | undefined;
  imageHeight?: number;
}

const IntroduceForm = ({
  title,
  description,
  image,
  imageHeight,
}: IntroduceProps) => {
  return (
    <div className="mx-auto -space-y-1 text-center">
      <h1 className="text-2xl font-semibold">{title}</h1>
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
        description.map((description) => <p key={description}>{description}</p>)
      ) : (
        <p>{description}</p>
      )}
    </div>
  );
};

export default IntroduceForm;
