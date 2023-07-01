import { HOBBY, INFO } from '@/constants'
import Image from 'next/image'

export default function About() {
  return (
    <div className='w-full max-w-[1000px] h-[100vh]'>
      <div className='p-4'>
        <h1 className='text-[2.5rem] opacity-0 translate-y-10 animate-slide-in'>About.</h1>
        <h2 className='text-[1.8rem] opacity-0 mt-8 translate-y-10 animate-slide-in'>Me</h2>
        <div className='flex justify-between'>
          <ul className='mt-4 ml-1'>
          {INFO.map((info, index) => (
            <li
              key={info.label}
              className='opacity-0 leading-normal my-4 animate-slide-in translate-y-10 animation-delay-500'
              style={{animationDelay: `${index * 0.1 + 1.3}s`}}
            >
              <p className='mb-1 font-bold'>
                {info.label}
              </p>
              <p className='text-sm'>
                {info.value}
              </p>
            </li>
          ))}
          </ul>
          <div className='pr-20'>
            <Image
              className='opacity-0 translate-y-10 animate-slide-in'
              style={{animationDelay: '1.2s'}}
              src='https://res.cloudinary.com/df2xdrnvc/image/upload/v1687621120/dev-blogs/profile_me_cfmjmz.png'
              width={300}
              height={100}
              alt='kurosawa'
            />
          </div>
        </div>

        <h2 className='text-[1.8rem] opacity-0 mt-8 translate-y-10 animate-slide-in'>Hobby</h2>
        <div>
          <ul className='mt-4 ml-1'>
          {HOBBY.map((hobby, index) => (
            <li
              key={hobby.label}
              className='opacity-0 leading-normal my-4 animate-slide-in translate-y-10 animation-delay-500'
              style={{animationDelay: `${index * 0.1 + 1.3}s`}}
            >
              <p className='mb-1 font-bold'>
                {hobby.label}
              </p>
              <p className='text-sm'>
                {hobby.value}
              </p>
            </li>
          ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
