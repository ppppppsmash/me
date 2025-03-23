"use client";

import { useEffect, useState } from "react";
import GitHubCalendar from "react-github-calendar"
import { GithubActivityFeed } from "react-github-activity-feed"
import "react-github-activity-feed/dist/light.css"
import { AuroraText } from "@/components/AuroraText";

const explicitTheme = {
  light: ["#f0f0f0", "#c4edde", "#7ac7c4", "#f73859", "#384259"],
  dark: ["#1B2631", "#D7BDE2", "#AF7AC5", "#9B59B6", "#512E5F"],
}



export default function Github() {
  const [activity, setActivity] = useState([])
  const [avatar, setAvatar] = useState("")
  const [user, setUser] = useState("")

  const fetchGitActivity = async() => {
    const response = await fetch("https://api.github.com/users/ppppppsmash/events", {
      method: "GET"
    })
    const data = await response.json()
    setActivity(data)

    if (data.length > 0) {
      setAvatar(data[0].actor.avatar_url)
      setUser(data[0].actor.login)
    }
  }

  useEffect(() => {
    fetchGitActivity()
  }, [])

  return (
    <div id="github-page" className="w-full max-w-[800px] md:h-[100vh] z-50">
      <div className="p-4 pb-10 relative">
        <h1 className="text-2xl sm:text-[2.5rem] opacity-0 translate-y-10 animate-slide-in flex sm:items-center">
          <AuroraText className="font-bold">
            Github Activity
          </AuroraText>
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

        <div className="mt-5 ">  
          <GithubActivityFeed
            user="ppppppsmash"
          />
        </div>
      </div>
    </div>   
  )
};
