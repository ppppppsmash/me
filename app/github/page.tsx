"use client";

import { useEffect, useState } from "react";
import GitHubCalendar from "react-github-calendar";
import NeonText from "@/components/NeonText";
import GitActivityFeed from "@/components/GitActivityFeed";

const explicitTheme = {
  light: ["#e8f5e9", "#a5d6a7", "#66bb6a", "#2e7d32", "#1b5e20"],
  dark: ["#0d1f13", "#065f46", "#059669", "#10b981", "#34d399"],
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
    <div id="github-page" className="w-full max-w-[800px] md:h-[100vh] z-50 flex flex-col">
      {/* Fixed header area */}
      <div className="p-4 pb-0 shrink-0">
        <h1 className="text-2xl sm:text-[2.5rem] opacity-0 translate-y-10 animate-slide-in flex sm:items-center pt-24 pb-2 sm:pt-2">
          <NeonText color="#10b981">Github</NeonText>
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
      </div>

      {/* Scrollable activity feed */}
      <div className="flex-1 min-h-0 overflow-y-auto px-4 mt-8 pb-[170px]">
        <GitActivityFeed username="ppppppsmash" />
      </div>
    </div>
  );
}
