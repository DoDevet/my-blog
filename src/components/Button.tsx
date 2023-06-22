import Link from "next/link";

interface RouteButtonProps {
  href: string;
  btnText: string;
}

const RouteButton = ({ href, btnText }: RouteButtonProps) => {
  return (
    <Link
      href={href}
      className={
        "px-2 py-1 mx-auto block w-fit mt-4 bg-sky-600 hover:bg-sky-800 text-white dark:bg-orange-600 rounded-md dark:hover:bg-orange-700 transition-colors shadow-sm"
      }
    >
      {btnText}
    </Link>
  );
};

export default RouteButton;
