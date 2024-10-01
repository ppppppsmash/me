import React from "react";
import { FloatingDock } from "@/components/FloatingDock";
import {
  IconCode,
  IconHome,
  IconBrandGithub,
  IconUser,
  IconBubbleText,
} from "@tabler/icons-react";

export default function Nav() {
  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-300" />
      ),
      href: "/",
    },

    {
      title: "Profile",
      icon: (
        <IconUser className="h-full w-full text-neutral-300" />
      ),
      href: "/about",
    },
    {
      title: "Resume",
      icon: (
        <IconCode className="h-full w-full text-neutral-300" />
      ),
      href: "/resume",
    },
    {
      title: "Github",
      icon: (
        <IconBrandGithub className="h-full w-full text-neutral-300" />
      ),
      href: "/github",
    },
    {
      title: "Relax",
      icon: (
        <IconBubbleText className="h-full w-full text-neutral-300" />
      ),
      href: "/relax",
    },
  ];
  return (
    <div className="fixed px-8 left-1/2 -translate-x-1/2 bottom-6 z-[9999]">
      <div className="flex items-center justify-center w-full">
        <FloatingDock
          items={links}
        />
      </div>
    </div>
  );
}
