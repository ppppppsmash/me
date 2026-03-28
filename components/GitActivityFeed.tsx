"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";

interface GitEvent {
  id: string;
  type: string;
  repo: { name: string; url: string };
  created_at: string;
  payload: any;
  actor: { login: string; avatar_url: string };
}

function formatAction(event: GitEvent): { action: string; body: string; branch: string } {
  const { type, payload } = event;
  switch (type) {
    case "PushEvent": {
      const commits = payload.commits || [];
      const branch = (payload.ref || "").replace("refs/heads/", "");
      if (commits.length > 0) {
        const messages = commits.map((c: any) => c.message.split("\n")[0]);
        return {
          action: `pushed ${commits.length} commit${commits.length > 1 ? "s" : ""}`,
          body: messages.join("\n"),
          branch,
        };
      }
      return {
        action: "pushed to",
        body: "",
        branch,
      };
    }
    case "CreateEvent":
      return {
        action: `created ${payload.ref_type}`,
        body: payload.ref || "",
        branch: payload.ref || "",
      };
    case "DeleteEvent":
      return {
        action: `deleted ${payload.ref_type}`,
        body: payload.ref || "",
        branch: "",
      };
    case "PullRequestEvent":
      return {
        action: `${payload.action} pull request`,
        body: `#${payload.pull_request?.number} ${payload.pull_request?.title || ""}`,
        branch: payload.pull_request?.head?.ref || "",
      };
    case "IssuesEvent":
      return {
        action: `${payload.action} issue`,
        body: `#${payload.issue?.number} ${payload.issue?.title || ""}`,
        branch: "",
      };
    case "IssueCommentEvent":
      return {
        action: "commented on",
        body: `#${payload.issue?.number} ${payload.issue?.title || ""}`,
        branch: "",
      };
    case "WatchEvent":
      return { action: "starred", body: "", branch: "" };
    case "ForkEvent":
      return { action: "forked", body: payload.forkee?.full_name || "", branch: "" };
    case "ReleaseEvent":
      return {
        action: `released ${payload.release?.tag_name || ""}`,
        body: payload.release?.name || "",
        branch: "",
      };
    default:
      return { action: type.replace("Event", "").toLowerCase(), body: "", branch: "" };
  }
}

function relativeTime(dateStr: string): string {
  const sec = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (sec < 60) return "just now";
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h`;
  const d = Math.floor(hr / 24);
  return `${d}d`;
}

function groupByDate(events: GitEvent[]): Map<string, GitEvent[]> {
  const groups = new Map<string, GitEvent[]>();
  events.forEach((e) => {
    const d = new Date(e.created_at);
    const key = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(e);
  });
  return groups;
}

export default function GitActivityFeed({ username }: { username: string }) {
  const [events, setEvents] = useState<GitEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}/events?per_page=30`)
      .then((r) => r.json())
      .then((d) => setEvents(Array.isArray(d) ? d : []))
      .catch(() => setEvents([]))
      .finally(() => setLoading(false));
  }, [username]);

  const grouped = useMemo(() => groupByDate(events), [events]);

  if (loading) {
    return (
      <div className="py-6 space-y-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-10 rounded dark:bg-white/5 bg-black/5 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {Array.from(grouped.entries()).map(([date, items]) => (
        <div key={date}>
          <p className="text-[11px] uppercase tracking-widest dark:text-neutral-500 text-neutral-400 mb-2 ml-1">
            {date}
          </p>
          <div className="space-y-px rounded-lg overflow-hidden">
            {items.map((event, i) => {
              const { action, body, branch } = formatAction(event);
              const repo = event.repo.name.split("/")[1];

              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                  className="flex items-start gap-3 px-3 py-2.5
                    dark:bg-white/[0.03] dark:hover:bg-white/[0.06]
                    bg-black/[0.02] hover:bg-black/[0.04]
                    transition-colors cursor-default"
                >
                  <img
                    src={event.actor.avatar_url}
                    alt={event.actor.login}
                    className="w-6 h-6 rounded-full shrink-0 mt-0.5"
                  />

                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] dark:text-neutral-300 text-neutral-600 leading-snug">
                      <span className="dark:text-emerald-400 text-emerald-600 font-medium">{repo}</span>
                      <span className="mx-1 dark:text-neutral-600 text-neutral-300">/</span>
                      <span>{action}</span>
                      <span className="ml-1.5 text-[11px] dark:text-neutral-600 text-neutral-400 tabular-nums">
                        {relativeTime(event.created_at)}
                      </span>
                      {branch && (
                        <span className="ml-1.5 text-[11px] font-mono dark:text-emerald-500/60 text-emerald-600/60">
                          {branch}
                        </span>
                      )}
                    </p>
                    {body && (
                      <p className="text-[12px] dark:text-neutral-500 text-neutral-400 mt-0.5 leading-snug truncate">
                        {body}
                      </p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
