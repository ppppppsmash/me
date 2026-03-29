"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoGameController } from "react-icons/io5";

const DISCORD_ID = process.env.NEXT_PUBLIC_DISCORD_ID || "";

interface LanyardData {
  discord_status: "online" | "idle" | "dnd" | "offline";
  discord_user: {
    avatar: string;
    display_name: string;
    username: string;
    id: string;
  };
  activities: {
    name: string;
    type: number;
    state?: string;
    details?: string;
    platform?: string;
    assets?: {
      large_image?: string;
      large_text?: string;
      small_image?: string;
      small_text?: string;
    };
  }[];
  active_on_discord_desktop: boolean;
  active_on_discord_mobile: boolean;
  active_on_discord_embedded: boolean;
  listening_to_spotify: boolean;
  spotify: {
    song: string;
    artist: string;
    album: string;
    album_art_url: string;
    track_id: string;
  } | null;
}

const statusConfig = {
  online: { color: "#22c55e", label: "Online" },
  idle: { color: "#f59e0b", label: "Idle" },
  dnd: { color: "#ef4444", label: "Do Not Disturb" },
  offline: { color: "#6b7280", label: "Offline" },
};

// Activity type: 0=Playing, 1=Streaming, 2=Listening, 3=Watching, 4=Custom, 5=Competing
const activityVerb: Record<number, string> = {
  0: "Playing",
  1: "Streaming",
  2: "Listening to",
  3: "Watching",
  5: "Competing in",
};

// Custom verb per app name
const appVerb: Record<string, string> = {
  "YouTube": "Watching",
  "U-NEXT": "Watching",
  "Prime Video": "Watching",
  "Google Chrome": "Browsing",
  "Microsoft Edge": "Browsing",
  "ChatGPT": "Chatting with",
  "Code": "Coding in",
  "Visual Studio Code": "Coding in",
  "Notion": "Writing in",
  "Slack": "Chatting on",
  "Discord": "Chatting on",
  "Spotify": "Listening to",
};

function getActivityVerb(type: number, name: string): string {
  return appVerb[name] ?? activityVerb[type] ?? "Using";
}

export default function DiscordStatus() {
  const [data, setData] = useState<LanyardData | null>(null);
  const [expanded, setExpanded] = useState(false);
  const toggle = useCallback(() => setExpanded((p) => !p), []);

  useEffect(() => {
    // WebSocket for real-time updates
    let ws: WebSocket;
    let heartbeat: NodeJS.Timeout;

    function connect() {
      ws = new WebSocket("wss://api.lanyard.rest/socket");

      ws.onopen = () => {
        ws.send(JSON.stringify({
          op: 2,
          d: { subscribe_to_id: DISCORD_ID },
        }));
      };

      ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);

        if (msg.op === 1) {
          // Hello — start heartbeat
          heartbeat = setInterval(() => {
            ws.send(JSON.stringify({ op: 3 }));
          }, msg.d.heartbeat_interval);
        }

        if (msg.op === 0) {
          // Event
          if (msg.t === "INIT_STATE" || msg.t === "PRESENCE_UPDATE") {
            setData(msg.d);
          }
        }
      };

      ws.onclose = () => {
        clearInterval(heartbeat);
        // Reconnect after 5s
        setTimeout(connect, 5000);
      };
    }

    connect();

    return () => {
      clearInterval(heartbeat);
      ws?.close();
    };
  }, []);

  if (!data) return null;

  const status = statusConfig[data.discord_status];
  const ps5Activity = data.activities.find((a) => a.platform === "ps5");
  const activity = data.activities.find((a) => a.type !== 4 && a.platform !== "ps5"); // Skip custom status & PS5
  const customStatus = data.activities.find((a) => a.type === 4);

  return (
    <div className="fixed top-[68px] left-[20px] z-[9998]">
      {/* Collapsed: KUROSAWA is ... */}
      <motion.button
        onClick={toggle}
        className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg
          dark:bg-white/[0.06] bg-black/[0.04]
          border dark:border-white/[0.08] border-black/[0.06]
          backdrop-blur-sm cursor-pointer select-none
          dark:hover:bg-white/[0.1] hover:bg-black/[0.06]
          transition-colors"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Status dot */}
        <span
          className="w-2 h-2 rounded-full shrink-0"
          style={{ backgroundColor: status.color, boxShadow: `0 0 6px ${status.color}` }}
        />

        <div className="flex flex-col gap-0.5 max-w-[240px]">
          {data.listening_to_spotify && data.spotify ? (
            <span className="text-[10px] dark:text-neutral-400 text-neutral-500 flex items-center gap-1.5">
              <span className="dark:text-neutral-300 text-neutral-600 font-medium">KUROSAWA</span>
              <span className="text-[#1DB954]">♫</span>
              <span className="truncate">{data.spotify.artist} — {data.spotify.song}</span>
            </span>
          ) : activity ? (
            <span className="text-[10px] dark:text-neutral-400 text-neutral-500 truncate">
              <span className="dark:text-neutral-300 text-neutral-600 font-medium">KUROSAWA</span> is {getActivityVerb(activity.type, activity.name).toLowerCase()} {activity.name}
            </span>
          ) : data.active_on_discord_embedded ? (
            <span className="text-[10px] dark:text-neutral-400 text-neutral-500 flex items-center gap-1.5">
              <span className="dark:text-neutral-300 text-neutral-600 font-medium">KUROSAWA</span>
              <IoGameController className="text-[#006FCD] text-[11px]" />
              <span className="truncate">on PlayStation</span>
            </span>
          ) : (
            <span className="text-[10px] dark:text-neutral-400 text-neutral-500">
              <span className="dark:text-neutral-300 text-neutral-600 font-medium">KUROSAWA</span> is {status.label.toLowerCase()}
            </span>
          )}

          {/* PS5 second line */}
          {ps5Activity ? (
            <span className="text-[10px] text-[#006FCD] flex items-center gap-1 pl-0.5">
              <IoGameController className="text-[11px]" />
              <span className="truncate">Playing {ps5Activity.name}</span>
            </span>
          ) : data.active_on_discord_embedded && (activity || (data.listening_to_spotify && data.spotify)) ? (
            <span className="text-[10px] text-[#006FCD] flex items-center gap-1 pl-0.5">
              <IoGameController className="text-[11px]" />
              <span>on PlayStation5</span>
            </span>
          ) : null}
        </div>
      </motion.button>

      {/* Expanded card */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 left-0 w-[260px] rounded-xl overflow-hidden
              dark:bg-neutral-900/95 bg-white/95
              border dark:border-white/[0.08] border-black/[0.06]
              backdrop-blur-md shadow-xl"
          >
            {/* Header */}
            <div className="flex items-center gap-3 p-3 border-b dark:border-white/[0.06] border-neutral-100">
              <div className="relative shrink-0">
                <img
                  src={`https://cdn.discordapp.com/avatars/${data.discord_user.id}/${data.discord_user.avatar}.webp?size=64`}
                  alt={data.discord_user.display_name}
                  className="w-10 h-10 rounded-full"
                />
                <span
                  className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 dark:border-neutral-900 border-white"
                  style={{ backgroundColor: status.color }}
                />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium dark:text-neutral-100 text-neutral-800 truncate">
                  {data.discord_user.display_name}
                </p>
                <p className="text-[11px] dark:text-neutral-500 text-neutral-400">
                  {customStatus?.state || status.label}
                </p>
              </div>
            </div>

            {/* Spotify */}
            {data.listening_to_spotify && data.spotify && (
              <div className="flex items-center gap-3 p-3 border-b dark:border-white/[0.06] border-neutral-100">
                <img
                  src={data.spotify.album_art_url}
                  alt={data.spotify.album}
                  className="w-11 h-11 rounded-md shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-wider text-[#1DB954] font-medium mb-0.5">
                    Listening to Spotify
                  </p>
                  <p className="text-[12px] dark:text-neutral-200 text-neutral-700 font-medium truncate">
                    {data.spotify.song}
                  </p>
                  <p className="text-[11px] dark:text-neutral-400 text-neutral-500 truncate">
                    {data.spotify.artist}
                  </p>
                </div>
              </div>
            )}

            {/* Game / Activity */}
            {activity && (
              <div className="p-3">
                <p className="text-[10px] uppercase tracking-wider dark:text-neutral-500 text-neutral-400 font-medium mb-1">
                  {getActivityVerb(activity.type, activity.name)}
                </p>
                <p className="text-[12px] dark:text-neutral-200 text-neutral-700 font-medium">
                  {activity.name}
                </p>
                {activity.details && (
                  <p className="text-[11px] dark:text-neutral-400 text-neutral-500 mt-0.5 truncate">
                    {activity.details}
                  </p>
                )}
                {activity.state && (
                  <p className="text-[11px] dark:text-neutral-400 text-neutral-500 truncate">
                    {activity.state}
                  </p>
                )}
              </div>
            )}

            {/* Console / Embedded device */}
            {(ps5Activity || data.active_on_discord_embedded) && (
              <div className="p-3 border-t dark:border-white/[0.06] border-neutral-100">
                <p className="text-[10px] uppercase tracking-wider text-[#006FCD] font-medium mb-1 flex items-center gap-1">
                  <IoGameController className="text-[11px]" />
                  {ps5Activity ? "Playing on PlayStation 5" : "On PlayStation 5"}
                </p>
                {ps5Activity ? (
                  <p className="text-[12px] dark:text-neutral-200 text-neutral-700 font-medium truncate">
                    {ps5Activity.name}
                  </p>
                ) : (
                  <p className="text-[11px] dark:text-neutral-400 text-neutral-500">
                    Online
                  </p>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
