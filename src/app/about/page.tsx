import Profile from "@/components/Profile";
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
      <Profile />
      <section
        className="flex flex-col p-4 mt-10 space-y-12 dark:bg-[#26262b]
bg-slate-100 rounded-md"
      >
        <IntroduceForm
          title="Who am I"
          description={"the world's greatest genius programmer".toUpperCase()}
          image={ProfileImage}
        />
        <IntroduceForm title="Career" image={Nothing} imageHeight={32} />
        <IntroduceForm title="Skills">
          <div className="grid gap-8 px-2 py-4 md:grid-cols-3 sm:grid-cols-2 max-h-fit">
            <div className="text-blue-600">
              <h1 className="mb-2 text-xl font-bold text-center">
                약간의 복습 필요
              </h1>
              <p>Node.js</p>
              <p>GraphQL</p>
              <p>Expo</p>
              <p>React Native</p>
              <p>Styled-Components</p>
            </div>
            <div className="text-violet-500">
              <h1 className="mb-2 text-xl font-bold text-center">자주 사용</h1>
              <p>React</p>
              <p>Next.js</p>
              <p>Typescript</p>
              <p>Prisma ORM</p>
              <p>Tailwind css</p>
            </div>
            <div className="text-orange-600">
              <h1 className="mb-2 text-xl font-bold text-center">접해봄</h1>
              <p>MongoDB</p>
            </div>
          </div>
        </IntroduceForm>

        <div>
          <IntroduceForm title="My Portfoilo" />
          <PostsForm carousel category="Portfoilo" />
        </div>
      </section>
    </>
  );
};

export default About;
