import HomeLayout from "@/layouts/homeLayout";

import Container from "@/components/shared/container";
import Line from "@/components/home/line";
import Button from "@/components/shared/button";

import Image from "next/image";

import { HiOutlineWrench as Wrench } from "react-icons/hi2";
import { TbMoodKid as Kid } from "react-icons/tb";
import { BsCodeSlash as Code } from "react-icons/bs";

const Page = () => {
  const features = [
    {
      title: "Dashboard",
      description: `Everything configurable via sweet's user friendly web dashboard`,
      imgSrc: "/dashboard.svg",
      imgWidth: 550,
      icon: <Wrench />,
    },
    {
      title: "Easy to use",
      description: `Multiple ways to setup everything, active support server and many more`,
      imgSrc: "/easytouse.svg",
      imgWidth: 480,
      icon: <Kid />,
    },
    {
      title: "Open source",
      description: `Everything is hosted on github so you can see how it works for yourself`,
      imgSrc: "/opensource.svg",
      imgWidth: 500,
      icon: <Code />,
    },
  ];
  return (
    <Container className="flex flex-col items-center justify-center">
      {/* hero  */}
      <section className="flex items-center mt-24 mb-44 text-center">
        <div
          className="relative before:flex before:content-[''] before:absolute before:blur-2xl
          before:top-0 before:bottom-0 before:left-[10%] before:w-[120%] before:max-w-[70vw] before:bg-primary/40
          before:rounded-[100%] before:mr-32 before:-rotate-[8deg]">
          <h2 className="lg:text-6xl md:text-[43px] text-4xl tracking-tight font-bold text-foreground">
            Next Generation
          </h2>
          <h2 className="lg:text-6xl md:text-[43px] text-4xl tracking-tight font-bold text-foreground mb-2">
            Discord Moderation
          </h2>

          <p className="text-foreground-soft text-lg md:text-xl lg:text-2xl mb-4">
            All in one AI powered moderation bot
          </p>

          {/* button group  */}
          <div className="flex flex-col md:flex-row items-center justify-center mb-5">
            <Button className="w-[90%] md:w-auto mb-4 md:mb-0 md:mr-4 px-10 md:px-16 py-6 text-xl">
              Vote
            </Button>{" "}
            <Button className="w-[90%] md:w-auto px-10 md:px-16 py-6 text-xl" variant="outline">
              Invite
            </Button>
          </div>
        </div>
        <Image
          className="-scale-x-100 w-[25vw] hidden md:block md:w-[40vw] max-w-xs"
          src="/detective.svg"
          height={300}
          width={300}
          alt="detective"
        />
      </section>

      {/* features  */}
      <section
        className="flex flex-col items-start last:mr-0 mb-20 relative
               before:flex before:content-[''] before:absolute before:blur-[170px]
            before:top-0 before:bottom-0 before:left-0 before:right-0 before:bg-primary-soft/20
            before:rounded-full pl-3">
        {features.map((feature, i) => {
          return (
            <div
              className="grid grid-cols-1 md:grid-rows-1 md:grid-cols-2 group
               h-full items-center md:items-start md:flex-row space-x-12 pb-28 relative"
              key={i}>
              <Line>{feature.icon}</Line>
              <div className="ml-12 md:ml-0 mb-8 md:mb-0 col-start-1 col-end-1 md:group-even:col-start-2 md:group-even:col-end-2">
                <h3 className="text-xl md:text-3xl font-bold tracking-tight">{feature.title}</h3>
                <p className="text-foreground-soft text-lg md:text-xl max-w-md">{feature.description}</p>
              </div>
              <Image
                className="ml-2 z-10 max-w-[40vw] min-w-[250px] md:col-start-2 md:col-end-2
                 group-even:col-start-1 group-even:col-end-1 md:row-start-1 md:row-end-1"
                src={feature.imgSrc}
                alt="dashboard"
                height={600}
                width={feature.imgWidth}
              />
            </div>
          );
        })}
      </section>
    </Container>
  );
};

Page.getLayout = function Layout(Page: React.ReactElement) {
  return <HomeLayout>{Page}</HomeLayout>;
};

export default Page;
