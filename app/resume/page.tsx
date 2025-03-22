import Link from "next/link";

import { SUB_RESUME } from "@/constants";
import ProximityCard from "@/components/ProximityCard";
import { IconCloud } from "@/components/IconCloud";
import { AuroraText } from "@/components/AuroraText";
import { stackSlugs } from "@/constants";
import { GlowingEffect } from "@/components/GlowingEffect";
import { GridItem } from "@/components/GridItem";
export default function Resume() {
  const images = stackSlugs.map(
    (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`,
  );

  return (
    <div className="w-full max-w-[800px] md:h-full">
      <div className="p-4 pb-[170px]">
        <h1 className="text-2xl sm:text-[2.5rem] opacity-0 translate-y-10 animate-slide-in flex items-center">
          <AuroraText className="font-bold">
            Resume
          </AuroraText>
        </h1>
        <h2 className="text-[1.8rem] opacity-0 mt-8 translate-y-10 animate-slide-in">Skill</h2>

        <div className="flex justify-center gap-2">
          <div className="relative flex size-full max-w-lg items-center justify-center overflow-hidden bg-background px-6 pb-6 pt-8">
            <IconCloud images={images} />
          </div>
        </div>

        <h2 className="mt-12 opacity-0 translate-y-10 animate-slide-in">実績 / お手伝い</h2>
        <ul className="grid md:grid-cols-6 gap-4 row-start-1 col-start-1 mt-6">
          {SUB_RESUME.map((service, index) => (
            <GridItem
              key={index}
              area={service.area}
              title={service.title}
              description={service.description}
              url={service.url}
              skill={service.skill}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
