import { INFO } from '@/constants'
import Image from 'next/image'

export default function About() {
  return (
    <div className='w-full max-w-[1000px] h-[100vh]'>
      <div className='p-4'>
        <h1 className='text-[2.5rem] opacity-0 translate-y-10 animate-slide-in'>About.</h1>
        <h2 className='text-[1.8rem] opacity-0 mt-8 translate-y-10 animate-slide-in'>Me</h2>
        <div className='flex justify-center'>
          <div>
            <Image
              className='opacity-0 translate-y-10 animate-slide-in'
              style={{animationDelay: '1.2s'}}
              src='https://res.cloudinary.com/df2xdrnvc/image/upload/v1687621120/dev-blogs/profile_me_cfmjmz.png'
              width={300}
              height={100}
              alt='kurosawa'
            />
          </div>
          <ul className='mt-4 ml-1'>
          {INFO.map((info, index) => (
            <li
              key={info.label}
              className='opacity-0 leading-normal my-4 animate-slide-in translate-y-10 animation-delay-500'
              style={{animationDelay: `${index * 0.1 + 1.3}s`}}
            >
              <span>
                {info.label}
                <br />
                {info.value}
              </span>
            </li>
          ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
