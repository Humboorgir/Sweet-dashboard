import type { Session, AuthOptions, Profile, User, Account } from "next-auth";
import type { JWT } from "next-auth/jwt";

import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

export const authOptions: AuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      authorization: process.env.DISCORD_AUTHORIZATION_URL,
    }),
  ],
  callbacks: {
    session({ session, token }) {
      if (!session.user) return session;
      session.user.id = token.id as string;
      session.user.name = token.name!;
      return session;
    },
    jwt({ token, account, profile }) {
      if (!profile || !account) return token;
      token.name = profile.global_name;
      token.id = profile.id;
      token.accessToken = account.access_token;
      return token;
    },
  },
};

export default NextAuth(authOptions);
