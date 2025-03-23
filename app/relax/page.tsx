"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";

import supabase from "@/lib/supabaseClient";
import { AuroraText } from "@/components/AuroraText";


const StarIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  );
};

export default function Relax() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from("feedbacks")
        .select("*")
        .eq("project_id", 1)
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
      } else {
        setData(data);
      }
    }

    fetchData();
  }, [data]);

  return (
    <div className="w-full max-w-[800px] md:h-full">
      <div className="p-4 pb-[170px]">
        <h1 className="text-2xl sm:text-[2.5rem] opacity-0 translate-y-10 animate-slide-in flex items-center fixed">
          <AuroraText className="font-bold">
            Comments
          </AuroraText>
        </h1>

        <h2 className="text-[1.8rem] opacity-0 mt-12 translate-y-10 animate-slide-in">Your comment is posted here</h2>

        <div className="mt-4 relative">
          <ul className="-mb-8 px-1 md:px-4">
            {data.map((item) => (
              <li
                className="relative pb-8"
                key={item.id}
              >
                <span className="absolute left-5 top-8 -ml-px h-[calc(100%-4rem)] w-0.5 rounded bg-zinc-200 dark:bg-zinc-800"></span>
                <div className="relative flex items-start space-x-3">
                  <div className="-mt-1 flex min-w-0 flex-1 items-center gap-3">
                    <b className="text-sm font-bold dark:text-zinc-100">{item.user_name}</b>
                    <time className="inline-flex select-none text-[12px] font-medium opacity-40">
                      {format(new Date(item.created_at), "yyyy-MM-dd HH:mm:ss")}
                    </time>
                  </div>
                </div>
                <div className="mt-4 mb-1 pl-[3.25rem] text-sm">
                  <div className="flex items-center gap-2 mb-2">
                  {[...Array(5)].map((_, index) => (
                    <StarIcon
                      key={index}
                      className={`h-5 w-5 ${item.rating > index ? "fill-white" : "fill-muted stroke-muted-foreground"}`}
                      />
                    ))}
                  </div>
                  <p>{item.message}</p>
                </div>
                
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
