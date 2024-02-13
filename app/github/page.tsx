'use client'

import { useEffect, useState } from 'react'
import GitHubCalendar from 'react-github-calendar'
import { GithubActivityFeed } from 'react-github-activity-feed'
import "react-github-activity-feed/dist/light.css"
import Image from 'next/image'

const explicitTheme = {
  light: ['#f0f0f0', '#c4edde', '#7ac7c4', '#f73859', '#384259'],
  dark: ['#383838', '#4D455D', '#7DB9B6', '#F5E9CF', '#E96479'],
}



export default function Github() {
  const [activity, setActivity] = useState([])
  const [avatar, setAvatar] = useState('')
  const [user, setUser] = useState('')

  const fetchGitActivity = async() => {
    const response = await fetch('https://api.github.com/users/ppppppsmash/events', {
      method: 'GET'
    })
    const data = await response.json()
    setActivity(data)

    if (data.length > 0) {
      setAvatar(data[0].actor.avatar_url);
      setUser(data[0].actor.login);
    }
  }
  //setActivity(fetchGitActivity())

  useEffect(() => {
    fetchGitActivity()
  }, [])

  return (
    <div id="github-page" className='w-full max-w-[800px] md:h-[100vh]'>
      <div className='p-4 pb-10 relative'>
        <h1 className='text-2xl sm:text-[2.5rem] opacity-0 translate-y-10 animate-slide-in flex sm:items-center'>
          <span className='skill-effect gap-x-2 font-semibold bg-clip-text text-transparent bg-gradient-to-r
            from-fuchsia-400 via-rose-500 to-yellow-600'>&lt;</span>
          <span className='skill-effect flex items-center gap-x-2 font-semibold bg-clip-text text-transparent bg-gradient-to-r
            from-fuchsia-400 via-rose-500 to-yellow-600'>
            Github Active
          </span>
          <span className='skill-effect gap-x-2 font-semibold bg-clip-text text-transparent bg-gradient-to-r
            from-fuchsia-400 via-rose-500 to-yellow-600 pl-4'>/&gt;</span>
        </h1>

        <div className='mt-6'>
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

      <div className="mt-5 z-50">
        {avatar && user && (
          <div className='flex items-center gap-x-4 mb-5'>
            <p>
              <Image
                className='rounded-full'
                src={avatar}
                width={50}
                height={50}
                alt='icon'
              />
            </p>
            <p>{user}</p>
          </div>
        )}
        {activity.map((item: any, index: number) => (
          <div
            className='mt-4'
            key={index}
          >
            <ul
              className='mb-3'
            >
              <li>
                {item.type}
              </li>
              <li>{item.created_at}</li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
