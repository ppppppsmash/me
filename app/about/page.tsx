import { INFO } from '@/constants'
import Image from 'next/image'
import Nav from '../components/Nav'

export default function About() {
  return (
    <div className='w-full h-[100vh]'>
      <div className='p-4'>
      <h1 className='text-[2.5rem] animate-slide-in'>About.</h1>
      <h2 className='text-[1.8rem] mt-8 animate-slide-in'>Me</h2>
        <ul className='mt-4 ml-1'>
        {INFO.map((info, index) => (
          <li
            key={info.label}
            className={`leading-normal my-4 animate-slide-in animation-delay-${index*100+1300}`}
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

      <Nav prev={{ label: 'Home', href: '/' }} />
    </div>
  )
}
