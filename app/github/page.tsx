'use client'

import GitHubCalendar from 'react-github-calendar'

export default function Github() {
  
  return (
    <div className='w-full max-w-[800px] md:h-[100vh]'>
      <div className='p-4 pb-20'>
        <GitHubCalendar
          username="ppppppsmash"
          blockMargin={4}
          blockSize={8}
          colorScheme="dark"
          fontSize={12}
          year="last"
        />
      </div>
    </div>
  )
}
