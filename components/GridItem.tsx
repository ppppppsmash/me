import Link from "next/link";
import { GlowingEffect } from "@/components/GlowingEffect";

interface GridItemProps {
  area: string;
  icon?: React.ReactNode;
  title: string;
  description: React.ReactNode;
  url: string;
  skill: string;
}

export const GridItem = ({ area, title, description, url, skill }: GridItemProps) => {
  return (
    <li className={`md:min-h-[14rem] min-h-[8rem] list-none ${area} col-span-2`}>
      <Link href={url}>
        <div className="relative h-full rounded-2.5xl border p-1 md:rounded-3xl rounded-xl">
          <GlowingEffect
            spread={40}
            glow={true}
            disabled={false}
            proximity={64}
          inactiveZone={0.01}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-0.75 p-6  dark:shadow-[0px_0px_27px_0px_#2D2D2D] md:p-6">
          <div className="relative flex flex-col flex-1 justify-between gap-3">
            {/* <div className="w-fit rounded-lg border border-gray-600 p-2 ">
              {icon}
            </div> */}
            <h3 className="pt-0.5 text-lg font-semibold font-sans -tracking-4 md:text-xl text-balance text-white">
              {title}
            </h3>
            <div className="space-y-2">
              <h2
                className="[&_b]:md:font-semibold [&_strong]:md:font-semibold font-sans text-sm/[1.125rem] 
              md:text-base/[1.375rem] text-neutral-400"
              >
                {description}
              </h2>

              <p className="text-xs text-neutral-400">{skill}</p>
            </div>
          </div>
          </div>
        </div>
      </Link>
    </li>
  );
};
