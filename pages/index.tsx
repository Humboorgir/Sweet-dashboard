import HomeLayout from "@/layouts/homeLayout";

import Container from "@/components/shared/container";

const Page = () => {
  return (
    <Container className="flex flex-col items-center justify-center">
      <span className="text-5xl font-bold text-foreground mb-1.5">Lorem ipsum dolor sit.</span>
      <p className="text-xl text-foreground-soft max-w-lg text-center">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente, quibusdam.
      </p>
    </Container>
  );
};

Page.getLayout = function Layout(Page: React.ReactElement) {
  return <HomeLayout>{Page}</HomeLayout>;
};

export default Page;
