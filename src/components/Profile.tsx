import Image from "next/image";
import ProfileImage from "../../public/images/my_profile.jpg";
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
      <h1 className="text-xl font-semibold">{`Hi, I'm Jihun`}</h1>
      <p>{`Front-End`}</p>
      <p className="text-gray-400">Aim to be a Full-Stack</p>
      <RouteButton href="/contact" btnText="Contact Me" />
    </section>
  );
}
