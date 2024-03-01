import { cls } from "@/libs/utils";
import Image, { StaticImageData } from "next/image";

interface IntroduceProps {
  title: string;
  description?: string | string[];
  image?: string | StaticImageData | undefined;
  imageHeight?: number;
  children?: React.ReactNode;
  className?: string;
}

const IntroduceForm = ({
  title,
  description,
  image,
  imageHeight,
  children,
  className,
}: IntroduceProps) => {
  return (
    <div className={cls("max-w-2xl mx-auto space-y-3", className ?? "")}>
      <h1 className="text-2xl font-semibold text-center">{title}</h1>
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
        <>{description}</>
      )}
      {children}
    </div>
  );
};

export default IntroduceForm;
