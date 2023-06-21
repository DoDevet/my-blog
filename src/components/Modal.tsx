import Link from "next/link";

const Modal = () => {
  return (
    <>
      <div className="fixed top-0 right-0 w-full h-full " />
      <div className="absolute h-auto px-2 py-2 space-y-10 border border-gray-500 rounded-md top-14 w-36 right-4 bg-slate-700">
        <div className="flex flex-col space-y-2">
          <Link href="/" className="transition-colors hover:text-gray-400">
            home
          </Link>
          <Link href="/about" className="transition-colors hover:text-gray-400">
            about
          </Link>
          <Link href="/posts" className="transition-colors hover:text-gray-400">
            posts
          </Link>
          <Link
            href="/contact"
            className="transition-colors hover:text-gray-400"
          >
            contact
          </Link>
        </div>
      </div>
    </>
  );
};

export default Modal;
