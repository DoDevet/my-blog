import Link from "next/link";

interface RouteButtonProps {
  href: string;
  btnText: string;
}

const RouteButton = ({ href, btnText }: RouteButtonProps) => {
  return (
    <Link
      href={href}
      className="inline-flex items-center px-5 py-2 text-sm font-medium text-white transition-all duration-200 rounded-full shadow-md bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-600 hover:to-indigo-600 dark:from-violet-500 dark:to-fuchsia-500 dark:hover:from-violet-600 dark:hover:to-fuchsia-600 hover:shadow-lg hover:-translate-y-0.5"
    >
      {btnText}
    </Link>
  );
};

export default RouteButton;
