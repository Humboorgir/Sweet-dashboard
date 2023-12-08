const Page = () => {
  return null;
};

export async function getServerSideProps(context: any) {
  const { serverId } = context.query;
  return {
    redirect: {
      permanent: false,
      destination: `/dashboard/${serverId}/overview`,
    },
  };
}

export default Page;
