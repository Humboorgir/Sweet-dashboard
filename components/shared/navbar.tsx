import Container from "@/components/shared/container";
import Button from "@/components/shared/button";

import Link from "next/link";

const Navbar = () => {
  const links = [
    { text: "Home", url: "/" },
    { text: "Commands", url: "/commands" },
    { text: "Support", url: "https://discord.gg/PUfgPYnZxc" },
    { text: "Invite", url: "/someurl" },
  ];

  return (
    <Container className="grid grid-cols-2 md:grid-cols-[auto,1fr,auto] place-items-stretch md:place-items-center py-4">
      {/* logo  */}
      <span className="font-bold text-xl font-mono">Sweet</span>

      <div className="space-x-2 last:mr-0 hidden md:inline">
        {links.map((link) => {
          return (
            <Button className="py-6 tracking-wide text-neutral-200 text-lg" variant="ghost" href={link.url}>
              {link.text}
            </Button>
          );
        })}
      </div>

      <Button variant="outline">Login with discord</Button>
    </Container>
  );
};

export default Navbar;
