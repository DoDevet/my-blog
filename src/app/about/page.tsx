import Profile from "@/components/Profile";
import IntroduceForm from "@/components/about/IntroduceForm";
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
        className="flex flex-col p-6 mt-10 space-y-12 dark:bg-[#26262b]
bg-white rounded-xl shadow-sm"
      >
        <IntroduceForm
          title="Who am I"
          description={["풀스택 개발자를 목표로 공부하고 있는 도지훈 입니다."]}
        />
        <IntroduceForm
          title="Career"
          description={["강남대학교 소프트웨어공학부", "정보처리기사"]}
        />
        <IntroduceForm title="Skills">
          <div className="grid gap-6 px-2 py-4 md:grid-cols-3 sm:grid-cols-2 max-h-fit">
            <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30">
              <h2 className="mb-3 text-lg font-bold text-center text-blue-500 dark:text-blue-400">
                약간의 복습 필요
              </h2>
              <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                <li>Node.js</li>
                <li>GraphQL</li>
                <li>Expo</li>
                <li>React Native</li>
                <li>Styled-Components</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-violet-50 dark:bg-violet-950/30">
              <h2 className="mb-3 text-lg font-bold text-center text-violet-500 dark:text-violet-400">
                자주 사용
              </h2>
              <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                <li>React</li>
                <li>Next.js</li>
                <li>Typescript</li>
                <li>Prisma ORM</li>
                <li>Tailwind css</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-orange-50 dark:bg-orange-950/30">
              <h2 className="mb-3 text-lg font-bold text-center text-orange-500 dark:text-orange-400">
                접해봄
              </h2>
              <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                <li>C</li>
                <li>C++</li>
                <li>JAVA</li>
                <li>MongoDB</li>
              </ul>
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
