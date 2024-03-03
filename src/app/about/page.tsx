import Profile from "@/components/Profile";
import IntroduceForm from "@/components/about/IntroduceForm";
import PostsForm from "@/components/PostsForm";
import { Metadata } from "next";
import CareerInfo from "@/components/about/CareerInfo";

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
        <IntroduceForm title="Who am I">
          <p>{"풀스택 개발자를 목표로 공부하고 있는 도지훈 입니다."}</p>
        </IntroduceForm>
        <IntroduceForm title="Career" className="w-full max-w-sm">
          <>
            <CareerInfo
              caption="강남대학교 소프트웨어공학부 졸업"
              date="2016.02 ~ 2023.02"
            />
            <CareerInfo
              caption="원티드 프리온보딩 인턴십"
              date="2023.06 ~ 2023.07"
            />
            <CareerInfo
              caption="MDB eCRF 재직중"
              captionHref="https://mdbcrf.com/"
              date="2023.11 ~ 현재"
            />
          </>
        </IntroduceForm>
        <IntroduceForm title="Skills" className="w-full max-w-sm">
          <CareerInfo caption="프론트 : React, React Native, Next.js" />
          <CareerInfo caption="백엔드 : Node.js, Prisma, MongoDB" />
          <CareerInfo caption="협업툴 : Github, Figma, Notion" />
          <CareerInfo caption="DevOps : Docker, Sentry" />
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
