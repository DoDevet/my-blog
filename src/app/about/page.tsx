import HomeProfile from "@/components/Profile";
import IntroduceForm from "@/components/about/IntroduceForm";
import Nothing from "../../../public/images/Nothing.png";
import ProfileImage from "../../../public/images/profile2.png";
import PostsForm from "@/components/PostsForm";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "About me",
  description: "My Career",
};
const About = () => {
  return (
    <>
      <HomeProfile />
      <section
        className="flex flex-col p-4 mt-10 space-y-12 dark:bg-[#26262b]
bg-[#fff7cd] rounded-md"
      >
        <IntroduceForm
          title="Who am I"
          description={"the world's greatest genius programmer".toUpperCase()}
          image={ProfileImage}
        />
        <IntroduceForm title="Career" image={Nothing} imageHeight={32} />
        <IntroduceForm
          title="Skills"
          description={[
            "HTML, CSS, Javascript, Typescript",
            "React, React Native, Next.js",
            "Node.js, Prisma ORM, GraphQL",
            "MongoDB, Tailwind Css, Styled-Components",
          ]}
        />
        <div>
          <IntroduceForm title="My Portfoilo" />
          <PostsForm carousel category="Portfoilo" />
        </div>
      </section>
    </>
  );
};

export default About;
