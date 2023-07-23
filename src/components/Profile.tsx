import Image from "next/image";
import ProfileImage from "../../public/images/profile.png";
import RouteButton from "./Button";
export default function Profile() {
  return (
    <section className="text-center">
      <Image
        src={ProfileImage}
        alt="profile"
        className="object-cover w-32 h-32 mx-auto border rounded-full shadow-md"
        priority
      />
      <h1 className="text-xl font-semibold">{`Hi, I'm Dozi`}</h1>
      <p>{`Front-End`}</p>
      <p className="text-gray-400">Newbie Developer</p>
      <RouteButton href="/contact" btnText="Contact Me" />
    </section>
  );
}