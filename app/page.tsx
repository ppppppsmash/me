import { PROFILE } from '@/constants'
import Image from 'next/image'

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='w-full h-[100vh] grid place-content-center'>
        <h1 className='text-[2.5rem] animate-op'>こんにちは、Kurosawaです。</h1>
        <ul className='mt-4 ml-1'>
          {PROFILE.map((profile, index) => (
            <li
              key={profile.label}
              className=''
            >
              <a
                href={profile.href}
                target='_blank'
                rel='noreferrer'
                className='no-underline p-1'
              >
                {profile.label}
              </a>
            </li>
          ))}
          
        </ul>
      </div>
    </main>
  )
}
