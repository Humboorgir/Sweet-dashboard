import HomeLayout from "@/layouts/homeLayout";

import Container from "@/components/shared/container";
import Button from "@/components/shared/button";

import Image from "next/image";

const Page = () => {
  // will make a hook to fetch these later
  // this is how many servers it had before it was discontinued
  const serverCount = 287;
  const userCount = 97324;

  const features = [
    {
      title: "Dashboard",
      description: `Everything configurable via sweet's user friendly web dashboard`,
      imgSrc: "/dashboard.svg",
      imgWidth: 600,
    },
    {
      title: "Easy to use",
      description: `Multiple ways to setup everything, active support server and many more`,
      imgSrc: "/easytouse.svg",
      imgWidth: 480,
    },
    {
      title: "Open source",
      description: `Everything is hosted on github so you can see how it works for yourself`,
      imgSrc: "/opensource.svg",
      imgWidth: 500,
    },
  ];
  return (
    <Container className="flex flex-col items-center justify-center">
      {/* hero  */}
      <section className="flex items-center mt-24 mb-32 text-center">
        <div
          className="relative before:flex before:content-[''] before:absolute before:blur-2xl
          before:top-0 before:bottom-0 before:left-[10%] before:w-[120%] before:bg-primary/40
          before:rounded-[100%] before:mr-32 before:-rotate-[8deg]">
          <h2 className="lg:text-6xl text-4xl tracking-tight font-bold text-foreground">Next Generation</h2>
          <h2 className="lg:text-6xl text-4xl tracking-tight font-bold text-foreground mb-2">
            Discord Moderation
          </h2>

          <p className="text-foreground-soft text-lg lg:text-2xl mb-4">
            All in one AI powered moderation bot
          </p>

          {/* button group  */}
          <div className="flex items-center justify-center mb-5">
            <Button className="mr-4 px-10 md:px-16 py-6 text-xl">Vote</Button>{" "}
            <Button className="px-10 md:px-16 py-6 text-xl" variant="outline">
              Invite
            </Button>
          </div>
        </div>
        <Image
          className="-scale-x-100 w-[30vw] md:w-[40vw] max-w-xs"
          src="/detective.svg"
          height={300}
          width={300}
          alt="detective"
        />
      </section>

      {/* features  */}
      <section
        className="flex flex-col items-center last:mr-0 mb-20 relative
               before:flex before:content-[''] before:absolute before:blur-[170px]
            before:top-0 before:bottom-0 before:left-0 before:right-0 before:bg-primary-soft/20
            before:rounded-full">
        {features.map((feature, i) => {
          const isFeatureOdd = i % 2 == 0;
          if (!isFeatureOdd)
            return (
              <div className="flex flex-col items-center md:items-start md:flex-row space-x-12 mb-28" key={i}>
                <div className="mt-10 ml-12 md:ml-0">
                  <h3 className="text-xl md:text-3xl font-bold tracking-tight">{feature.title}</h3>
                  <p className="text-foreground-soft text-lg md:text-xl max-w-md">{feature.description}</p>
                </div>
                <Image
                  className="z-10 max-w-[70vw]"
                  src={feature.imgSrc}
                  alt="dashboard"
                  height={600}
                  width={feature.imgWidth}
                />
              </div>
            );
          return (
            <div className="flex flex-col items-center md:items-start md:flex-row space-x-12 mb-28" key={i}>
              <Image
                className="z-10 max-w-[70vw]"
                src={feature.imgSrc}
                alt="dashboard"
                height={600}
                width={feature.imgWidth}
              />
              <div className="mt-10">
                <h3 className="text-xl md:text-3xl font-bold tracking-tight">{feature.title}</h3>
                <p className="text-foreground-soft text-lg md:text-xl max-w-md">{feature.description}</p>
              </div>
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
