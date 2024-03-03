import Link from "next/link";

interface CareerInfoProps {
  caption: string;
  captionHref?: string;
  date?: string;
}
const CareerInfo = ({ caption, captionHref, date }: CareerInfoProps) => {
  return (
    <section className="flex items-center w-full space-x-3">
      <div>•</div>
      <div className="font-bold">
        {captionHref ? (
          <Link
            className="text-blue-400 border-b border-b-blue-400"
            href={captionHref}
          >
            {caption}
          </Link>
        ) : (
          <p>{caption}</p>
        )}

        {date && <p className="text-sm font-normal">{date}</p>}
      </div>
    </section>
  );
};

export default CareerInfo;
