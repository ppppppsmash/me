import { INFO } from '@/constants'

export default function About() {
  return (
    <div className='w-full max-w-[1000px] h-[100vh]'>
      <div className='p-4'>
      <h1 className='text-[2.5rem] translate-y-10 animate-slide-in'>About.</h1>
      <h2 className='text-[1.8rem] mt-8 translate-y-10 animate-slide-in'>Me</h2>
        <ul className='mt-4 ml-1'>
        {INFO.map((info, index) => (
          <li
            key={info.label}
            className={`leading-normal my-4 animate-slide-in translate-y-10 animation-delay-500 animation-delay-${index*100+1300}`}
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
  )
}
