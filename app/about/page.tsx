import { HOBBY, INFO } from '@/constants'
import Image from 'next/image'

export default function About() {
  return (
    <div className='w-full max-w-[800px] md:h-[100vh]'>
      <div className='p-4 pb-20'>
        <h1 className='text-2xl sm:text-[2.5rem] opacity-0 translate-y-10 animate-slide-in flex items-center'>
          <span className='skill-effect flex items-center gap-x-2 font-semibold bg-clip-text text-transparent bg-gradient-to-r
            from-fuchsia-400 via-rose-500 to-yellow-600'>&lt;</span>
          <span className='skill-effect flex items-center gap-x-2 font-semibold bg-clip-text text-transparent bg-gradient-to-r
            from-fuchsia-400 via-rose-500 to-yellow-600'>
            About Me
          </span>
          <span className='skill-effect flex items-center gap-x-2 font-semibold bg-clip-text text-transparent bg-gradient-to-r
            from-fuchsia-400 via-rose-500 to-yellow-600 pl-4'>/&gt;</span>
        </h1>
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
          <div className='w-full max-w-[600px] m-auto p-0 relative'>
            <svg
              className='w-full h-full'
              version="1.2" height="300" width="600" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
              <path id="pulsar" stroke="rgba(255,255,255,0.5)" fill="none" strokeWidth="1" strokeLinejoin="round" d="M0,90L250,90Q257,60 262,87T267,95 270,88 273,92t6,35 7,-60T290,127 297,107s2,-11 10,-10 1,1 8,-10T319,95c6,4 8,-6 10,-17s2,10 9,11h210" /> 
            </svg>
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
