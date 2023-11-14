import Container from "@/components/shared/container";
import ProfilePicture from "@/components/shared/navbar/profilePicture";
import Button from "@/components/shared/button";

import { BiLogIn as Login } from "react-icons/bi";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

const Navbar = () => {
  const { data: session, status } = useSession();
  const links = [
    { text: "Home", url: "/" },
    { text: "Commands", url: "/commands" },
    { text: "Support", url: "https://discord.gg/PUfgPYnZxc" },
    { text: "Invite", url: "/someurl" },
  ];

  return (
    <Container className="flex items-center justify-between py-4">
      {/* logo  */}
      <span className="font-bold text-xl font-mono">Sweet</span>

      <div className="space-x-2 last:mr-0 hidden md:inline">
        {links.map((link, i) => {
          return (
            <Button
              key={i}
              className="py-6 font-medium tracking-wide text-lg text-primary-soft"
              variant="ghost"
              href={link.url}>
              {link.text}
            </Button>
          );
        })}
      </div>

      {/* -- login button -- */}

      {/* loading state  */}
      {status == "loading" && <Button variant="outline">Loading...</Button>}

      {/* display login button if user is unauthenticated  */}
      {status == "unauthenticated" && (
        <Button onClick={() => signIn("discord", { callbackUrl: "/dashboard" })} variant="outline">
          Login <Login className="ml-1 text-lg" />
        </Button>
      )}

      {/* display account info if user is authenticated  */}
      {status == "authenticated" && (
        <div className="flex items-center">
          {/* profile picture  */}
          <ProfilePicture session={session} />
          {/* username & log out button  */}
          <div className="ml-2 flex flex-col">
            <h3
              className="font-bold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r
            from-foreground to-foreground-soft">
              {session.user.name}
            </h3>
            <Button
              onClick={() => signOut()}
              variant="ghost"
              className="py-0 !px-0.5 h-fit w-fit text-xs text-red-500 hover:bg-red-500/20">
              Log out
            </Button>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Navbar;
