import { HOBBY, INFO } from '@/constants'
import Link from "next/link";
import Image from 'next/image'

import { CardBody, CardContainer, CardItem } from '@/components/3dCard'

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
          <div className='w-full max-w-[80%] sm:max-w-[400px] m-auto p-0 absolute sm:relative right-0 z-50'>
            <CardContainer className="inter-var">
              <CardBody>
                <CardItem translateZ="100" className="w-full mt-4">
                  <Image
                    src="/images/me.png"
                    height="500"
                    width="500"
                    className="w-full object-cover group-hover/card:shadow-xl"
                    alt="thumbnail"
                  />
                </CardItem>
              </CardBody>
            </CardContainer>
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
