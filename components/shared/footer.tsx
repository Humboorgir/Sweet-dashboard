import Button from "@/components/shared/button";

import { cn } from "@/lib/utils";
import { HtmlHTMLAttributes } from "react";

import {
  FaGithub as Github,
  FaDiscord as Discord,
  FaYoutube as Youtube,
  FaInstagram as Instagram,
} from "react-icons/fa";

type Props = HtmlHTMLAttributes<HTMLDivElement>;

const Footer = ({ className, ...props }: Props) => {
  const links = [
    { title: "Dashboard", url: "/dashboard" },
    { title: "Commands", url: "/commands" },
    { title: "Invite", url: "/invite" },
    { title: "Terms of service", url: "/tos" },
    { title: "Privacy policy", url: "/privacypolicy" },
    { title: "About us", url: "/about" },
    { title: "Developers", url: "/developers" },
    { title: "Support server", url: "/supportserver" },
    { title: "Change log", url: "/changelog" },
  ];
  return (
    <footer
      className={cn(
        `border-t-2 border-t-neutral-800 py-12 pt-[72px]
       flex flex-col lg:items-center`,
        className
      )}
      {...props}>
      <div className="w-[80%] max-w-4xl mx-auto">
        {/* links  */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 place-items-center items-start 
        justify-items-start mx-auto w-fit gap-8 sm:gap-x-14 mb-14">
          {/* brand logo & name */}
          <div className="col-span-1">
            <h3 className="text-foreground text-4xl md:text-5xl tracking-tight font-bold">LOGO</h3>
            <p className="text-foreground-soft text-base ">Sweet 2023</p>
          </div>

          <div className="flex flex-col">
            <h3 className="font-bold text-foreground uppercase px-3">Links</h3>
            {links.slice(0, 3).map((link) => {
              return (
                <Button
                  key={link.url}
                  variant="ghost"
                  className="text-foreground-soft h-auto flex justify-start w-max py-0.5 uppercase"
                  href={link.url}>
                  {link.title}
                </Button>
              );
            })}
          </div>
          <div className="flex flex-col">
            <h3 className="font-bold text-foreground uppercase px-3">Team</h3>
            {links.slice(3, 6).map((link) => {
              return (
                <Button
                  key={link.url}
                  variant="ghost"
                  className="text-foreground-soft h-auto flex justify-start w-max py-0.5 uppercase"
                  href={link.url}>
                  {link.title}
                </Button>
              );
            })}
          </div>
          <div className="flex flex-col">
            <h3 className="font-bold text-foreground uppercase px-3">Sweet</h3>
            {links.slice(6, 9).map((link) => {
              return (
                <Button
                  key={link.url}
                  variant="ghost"
                  className="text-foreground-soft h-auto flex justify-start w-max py-0.5 uppercase"
                  href={link.url}>
                  {link.title}
                </Button>
              );
            })}
          </div>
        </div>
        {/* copyright notice and social media  */}
        <div className="text-foreground-soft text-center w-fit mx-auto">
          <div className="flex justify-center items-center space-x-6 text-3xl mb-4">
            {[Github, Discord, Youtube, Instagram].map((El, i) => {
              return (
                <El
                  key={i}
                  className="rounded-full border border-neutral-600 h-12 w-12
                 p-2 hover:bg-neutral-800 transition-colors cursor-pointer"
                />
              );
            })}
          </div>
          <span className="text-foreground-soft text-base text-center">
            Copyright &copy; Sweet 2023 - all rights reserved
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
