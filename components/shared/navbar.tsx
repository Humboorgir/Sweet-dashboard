import Container from "@/components/shared/container";
import Button from "@/components/shared/button";

import { BiLogIn as Login } from "react-icons/bi";

const Navbar = () => {
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
        {links.map((link) => {
          return (
            <Button
              className="py-6 font-medium tracking-wide text-lg text-primary-soft"
              variant="ghost"
              href={link.url}>
              {link.text}
            </Button>
          );
        })}
      </div>

      <Button variant="outline">
        Login <Login className="ml-1 text-lg" />
      </Button>
    </Container>
  );
};

export default Navbar;
