import { PROFILE } from '@/constants'
import Image from 'next/image'

export default function Home() {
  return (
    <div className='w-full h-[100vh] grid place-content-center'>
      <h1 className='text-[2.5rem] animate-slide-in'>こんにちは、Kurosawaです。</h1>
      <ul className='mt-4 ml-1'>
        {PROFILE.map((profile, index) => (
          <li
            key={profile.label}
            className={`animate-slide-in animation-delay-${index*100+1300}`}
          >
            <a
              href={profile.href}
              target='_blank'
              rel='noreferrer'
              className='no-underline p-1 transition-color 
              duration-200 ease-in-out'
            >
              {profile.label}
            </a>
          </li>
        ))}
        
      </ul>
    </div>
  )
}
