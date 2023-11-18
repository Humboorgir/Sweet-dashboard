import NextAuth from "next-auth";

declare module "next-auth" {
  interface Profile {
    id: string;
    global_name: string;
  }

  interface Session {
    user: {
      id: string;
      name: string;
      image: string | null;
    };
    accessToken: string;
  }

  interface JWT {
    accessToken: string;
  }
}
