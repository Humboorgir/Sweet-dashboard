import DashboardLayout from "@/layouts/dashboardLayout";
import Container from "@/components/shared/container";

import { FaRobot as Robot } from "react-icons/fa";
import Button from "@/components/shared/button";

const Page = () => {
  // TODO: add user-friendly messages telling them what they can do here
  // like managing welcome messages, auto moderation and ...
  return (
    <Container className="h-full overflow-y-scroll p-4 pb-28 flex flex-col justify-center items-center">
      <h1
        className="text-foreground text-4xl font-extrabold 
    tracking-tight lg:text-5xl mb-0.5 flex items-center">
        Welcome back! <Robot className="text-6xl rotate-6 ml-3" />
      </h1>
      <p className="text-lg md:text-xl text-foreground-soft mb-8 mr-3">select a server to get started</p>
    </Container>
  );
};
Page.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
export default Page;
