import DashboardLayout from "@/layouts/dashboardLayout";
import SaveChanges from "@/components/dashboard/saveChanges";
import TextArea from "@/components/shared/textarea";
import Switch from "@/components/shared/switch";

import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";

import { RiErrorWarningLine as Warning } from "react-icons/ri";
import { IoPeopleSharp as People } from "react-icons/io5";
import { MdDriveFileRenameOutline as Pen, MdOutlineAdminPanelSettings as Admin } from "react-icons/md";
import { VscGistSecret as Secret } from "react-icons/vsc";

const Page = () => {
  const guild = useSelector((state: RootState) => state.guild);
  const router = useRouter();
  const dispatch = useDispatch();

  const mutualGuilds = useSelector((state: RootState) => state.mutualGuilds.data);
  const error = useSelector((state: RootState) => state.error.message);
  if (error) console.log(error);

  const { serverId } = router.query;

  const isGuildInMutualGuilds = mutualGuilds.some((guild) => guild.id == serverId);

  if (!isGuildInMutualGuilds)
    return (
      <div className="p-5 font-bold text-xl flex items-center">
        This server requires setup <Warning className="text-xl ml-2" />
      </div>
    );

  // Main page
  return (
    <div className="p-5 md:px-8 md:pt-12 max-w-[calc(100vw-100px)]">
      <h2 className="text-3xl text-gradient mb-5">Overview</h2>
      <div className="w-fit flex items-center justify-center flex-wrap">
        {[
          { title: "Name", data: guild.name, icon: <Pen /> },
          {
            title: "ID",
            data: guild.id,
            icon: <Secret />,
          },
          { title: "Role count", data: guild.roleCount, icon: <Admin /> },
          {
            title: "Verification level",
            data: guild.verification_level,
            icon: <People />,
          },
        ].map((info) => {
          return (
            <div
              className="border border-neutral-700 h-[100px] w-full min-w-[220px] mr-3 mb-3 duration-300
            rounded-3xl p-5 flex flex-col items-start justify-center translate-y-0 scale-100
            hover:translate-y-[-5px] hover:scale-[1.02] transition-all">
              <div className="text-foreground mb-2 flex items-center">
                <span className="text-2xl mr-2">{info.icon} </span>
                <h3 className="text-xl">{info.title}</h3>
              </div>
              <p className="text-foreground-soft">{info.data}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

Page.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Page;
