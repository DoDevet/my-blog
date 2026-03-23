import Image from "next/image";
import ProfileImage from "../../public/images/my_profile.jpg";
import RouteButton from "./Button";
export default function Profile() {
  return (
    <section className="flex flex-col items-center py-8 space-y-4 text-center">
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 dark:from-violet-400 dark:to-fuchsia-500 blur-md opacity-60" />
        <Image
          src={ProfileImage}
          alt="profile"
          className="relative object-cover w-36 h-36 border-4 border-white rounded-full shadow-lg dark:border-gray-700"
          priority
        />
      </div>
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">{`Hi, I'm Jihun`}</h1>
        <p className="text-lg font-medium text-sky-600 dark:text-violet-400">{`Front-End Developer`}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">Aim to be a Full-Stack</p>
      </div>
      <RouteButton href="/contact" btnText="Contact Me" />
    </section>
  );
}
