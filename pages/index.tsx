import HomeLayout from "@/layouts/homeLayout";

import Container from "@/components/shared/container";
import Button from "@/components/shared/button";

import Image from "next/image";

const Page = () => {
  return (
    <Container className="flex flex-col items-center justify-center">
      {/* hero  */}
      <section className="flex items-center mb-20 text-center">
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
          <div className="flex items-center justify-center">
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
    </Container>
  );
};

Page.getLayout = function Layout(Page: React.ReactElement) {
  return <HomeLayout>{Page}</HomeLayout>;
};

export default Page;
