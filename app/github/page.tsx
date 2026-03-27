"use client";

import { useEffect, useState } from "react";
import GitHubCalendar from "react-github-calendar";
import { AuroraText } from "@/components/AuroraText";
import GitActivityFeed from "@/components/GitActivityFeed";

const explicitTheme = {
  light: ["#f0f0f0", "#c4edde", "#7ac7c4", "#f73859", "#384259"],
  dark: ["#1B2631", "#D7BDE2", "#AF7AC5", "#9B59B6", "#512E5F"],
};

export default function Github() {
  const [stats, setStats] = useState<{ repos: number; followers: number } | null>(null);

  useEffect(() => {
    fetch("https://api.github.com/users/ppppppsmash")
      .then((r) => r.json())
      .then((d) => setStats({ repos: d.public_repos, followers: d.followers }))
      .catch(() => {});
  }, []);

  return (
    <div id="github-page" className="w-full max-w-[800px] md:h-[100vh] z-50">
      <div className="p-4 pb-[170px] relative">
        <h1 className="text-2xl sm:text-[2.5rem] opacity-0 translate-y-10 animate-slide-in flex sm:items-center sticky top-0 z-40 pt-14 pb-2 sm:pt-2">
          <AuroraText className="font-bold">
            Github
          </AuroraText>
          {stats && (
            <span className="ml-4 flex gap-3 text-[11px] dark:text-neutral-500 text-neutral-400 self-end mb-1">
              <span>{stats.repos} repos</span>
              <span>{stats.followers} followers</span>
            </span>
          )}
        </h1>

        <div className="mt-6">
          <GitHubCalendar
            username="ppppppsmash"
            blockMargin={4}
            blockSize={8}
            colorScheme="dark"
            fontSize={12}
            year="last"
            theme={explicitTheme}
          />
        </div>

        <div className="mt-8">
          <GitActivityFeed username="ppppppsmash" />
        </div>
      </div>
    </div>
  );
}
