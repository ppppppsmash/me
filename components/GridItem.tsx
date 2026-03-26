import { GlowingEffect } from "@/components/GlowingEffect";
import { LinkPreview } from "@/components/LinkPreview";
import { cn } from "@/utils/cn";
interface GridItemProps {
  area?: string;
  icon?: React.ReactNode;
  title: string;
  description: React.ReactNode;
  skill: string;
  url: string;
}

export const GridItem = ({ area, title, description, url, skill }: GridItemProps) => {
  return (
    <li className={cn("list-none md:min-h-[14rem] min-h-[8rem] col-span-2", area)}>
      <LinkPreview url={url}>
        <div className="relative h-full rounded-2.5xl border p-1 md:rounded-3xl rounded-xl">
          <GlowingEffect
            spread={40}
            glow={true}
            disabled={false}
            proximity={64}
            inactiveZone={0.01}
          />
          <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-0.75 p-6 backdrop-blur-xl bg-white/60 border-neutral-200 dark:bg-black/20 dark:border-white/10 dark:shadow-[0px_0px_27px_0px_#2D2D2D] shadow-sm md:p-6 transition-all duration-300 hover:bg-white/80 hover:border-neutral-300 dark:hover:bg-black/30 dark:hover:border-white/20">
            <div className="absolute inset-0 bg-gradient-to-br dark:from-white/5 from-neutral-100/50 via-transparent dark:to-white/5 to-neutral-100/50 rounded-xl pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent dark:via-white/5 via-neutral-100/30 to-transparent rounded-xl pointer-events-none" />
            
            <div className="relative flex flex-col flex-1 justify-between gap-3 z-10">
              <h3 className="pt-0.5 text-lg font-semibold font-sans -tracking-4 md:text-xl text-balance dark:text-white text-neutral-800 drop-shadow-sm">
                {title}
              </h3>
              <div className="space-y-2">
                <h2
                  className="[&_b]:md:font-semibold [&_strong]:md:font-semibold font-sans text-sm/[1.125rem]
                md:text-base/[1.375rem] dark:text-neutral-300 text-neutral-600 drop-shadow-sm"
                >
                  {description}
                </h2>

                <p className="text-xs dark:text-neutral-400 text-neutral-500 drop-shadow-sm">{skill}</p>
              </div>
            </div>
          </div>
        </div>
      </LinkPreview>
    </li>
  );
};
