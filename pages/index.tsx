import HomeLayout from "@/layouts/homeLayout";

import Container from "@/components/shared/container";
import Button from "@/components/shared/button";

const Page = () => {
  return (
    <Container className="flex flex-col items-center justify-center">
      {/* hero  */}
      <section className="mb-20 text-center">
        <h2 className="md:text-6xl text-4xl tracking-tight font-bold text-foreground">Next Generation</h2>
        <h2 className="md:text-6xl text-4xl tracking-tight font-bold text-foreground mb-2">
          Discord Moderation
        </h2>

        <p className="text-foreground-soft text-lg md:text-2xl mb-4">All in one AI powered moderation bot</p>

        {/* button group  */}
        <div className="flex items-center justify-center">
          <Button className="mr-4 px-10 md:px-16 py-6 text-xl">Vote</Button>{" "}
          <Button className="px-10 md:px-16 py-6 text-xl" variant="outline">
            Invite
          </Button>
        </div>
      </section>
    </Container>
  );
};

Page.getLayout = function Layout(Page: React.ReactElement) {
  return <HomeLayout>{Page}</HomeLayout>;
};

export default Page;
