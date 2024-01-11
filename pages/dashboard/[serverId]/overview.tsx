import DashboardLayout from "@/layouts/dashboardLayout";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import { RiErrorWarningLine as Warning } from "react-icons/ri";
import { IoPeopleSharp as People } from "react-icons/io5";
import { MdDriveFileRenameOutline as Pen, MdOutlineAdminPanelSettings as Admin } from "react-icons/md";
import { VscGistSecret as Secret } from "react-icons/vsc";

import Head from "next/head";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import fetchGuildInfo from "@/lib/api/fetchGuildInfo";
import { setGuild } from "@/redux/features/guild";

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { serverId } = router.query;
  const { data: guild, isLoading } = fetchGuildInfo(serverId);
  if (guild) {
    dispatch(setGuild(guild));
  }

  if (!guild)
    return (
      <div className="p-5 font-bold text-xl flex items-center">
        This server requires setup <Warning className="text-xl ml-2" />
      </div>
    );

  const title = `${guild.name} - Overview`;
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      {/* metadata   */}
      <Head>
        <title>{title}</title>
      </Head>

      {/* page content  */}
      <div className="py-5 px-8 md:py-8">
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
          ].map((info, i) => {
            return (
              <div
                key={i}
                className="border border-neutral-700 h-[100px] w-full min-w-[220px] mr-3 mb-3 duration-300
            rounded-3xl p-5 flex flex-col items-start justify-center translate-y-0 scale-100
            hover:translate-y-[-5px] hover:scale-[1.02] transition-all">
                <div className="text-foreground mb-2 flex items-center">
                  <span className="text-2xl mr-2">{info.icon} </span>
                  <h3 className="text-xl">{info.title}</h3>
                </div>
                {info.data ? (
                  <p className="text-foreground-soft">{info.data}</p>
                ) : (
                  <Skeleton containerClassName="w-full" height={20} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </SkeletonTheme>
  );
};

Page.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Page;
