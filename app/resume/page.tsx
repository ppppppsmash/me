import Link from 'next/link'

import { SKILL, SUB_RESUME } from '@/constants'
import { TbBrandJavascript, TbBrandTypescript, TbBrandPython, TbBrandDjango } from 'react-icons/tb'
import { FaPhp, FaAws, FaVuejs, FaReact, FaNodeJs } from 'react-icons/fa'
import { SiTailwindcss, SiNextdotjs, SiSvelte, SiRubyonrails, SiAstro } from 'react-icons/si'
import ProximityCard from '@/components/ProximityCard'



const SKILL_ICONS = [
  {
    icon: <TbBrandJavascript size={24} />,
  },
  {
    icon: <FaPhp size={24} />,
  },
  {
    icon: <TbBrandPython size={24} />,
  },
  {
    icon: <FaNodeJs size={24} />,
  },
  {
    icon: <SiTailwindcss size={24} />,
  },
  {
    icon: <TbBrandTypescript size={24} />,
  },
  {
    icon: <FaAws size={24} />,
  },
  {
    icon: <FaVuejs size={24} />,
  },
  {
    icon: <FaReact size={24} />,
  },
  {
    icon: <SiSvelte size={24} />,
  },
  {
    icon: <SiNextdotjs size={24} />,
  },
  {
    icon: <SiRubyonrails size={26} />,
  },
  {
    icon: <TbBrandDjango size={24} />,
  },
  {
    icon: <SiAstro size={24} />
  }
]


export default function Resume() {

  return (
    <div className='w-full max-w-[800px] md:h-full'>
      <div className='p-4 pb-[170px]'>
      <h1 className='text-2xl sm:text-[2.5rem] opacity-0 translate-y-10 animate-slide-in flex items-center'>
        <span className='skill-effect flex items-center gap-x-2 font-semibold bg-clip-text text-transparent bg-gradient-to-r
          from-fuchsia-400 via-rose-500 to-yellow-600'>&lt;</span>
        <span className='skill-effect flex items-center gap-x-2 font-semibold bg-clip-text text-transparent bg-gradient-to-r
          from-fuchsia-400 via-rose-500 to-yellow-600'>
          Resume
        </span>
        <span className='skill-effect flex items-center gap-x-2 font-semibold bg-clip-text text-transparent bg-gradient-to-r
          from-fuchsia-400 via-rose-500 to-yellow-600 pl-4'>/&gt;</span>
      </h1>
      <h2 className='text-[1.8rem] opacity-0 mt-8 translate-y-10 animate-slide-in'>Skill</h2>

      <div className='flex justify-center gap-2'>
        <ul className='mt-4 ml-1 flex flex-wrap justify-between'>
          {SKILL_ICONS.map((item, index) => (
            <li
              key={index}
              className={`w-1/2 sm:w-1/3 gap-x-2 leading-normal opacity-0 my-4 translate-y-10 animate-slide-in flex items-center`}
              style={{animationDelay: `${index*0.1+1}s`}}
            >
              {item.icon}
              {SKILL[index]}
            </li>
          ))}
        </ul>
      </div>

      <h2 className='mt-12 opacity-0 translate-y-10 animate-slide-in'>実績 / お手伝い</h2>
      <div className='mt-4 grid sm:grid-cols-2 gap-x-8 gap-y-4'>
      {SUB_RESUME.map((service, index) => (
        <ProximityCard key={index}>
          <div
            className='relative group z-30 rounded-lg'
          >
            <Link
              href={{ pathname: service.url }}
              target="_blank"
              className='duration-200 hover:font-bold'
            >
            <div
              className='transition ease-in-out delay-150
                duration-300 z-40 mt-6 sm:mt-0 overflow-hidden'
            >
              <img
                className='w-full rounded-xl'
                src={service.image}
                alt={service.title}
                width={800}
                height={400}
                decoding='async'
              />
              <div className="p-2">
                <p className='mb-2'>{ service.description }</p>
                <p className='mb-2'>STACK INFO：{ service.skill }</p>
                <p className='mb-2'>INFRA INFO：{ service.infra }</p>
                <p className='flex items-center gap-x-2 mb-3 underline'></p>
              </div>
            </div>
            </Link>
          </div>
        </ProximityCard>
      ))}
      </div>
    </div>
  </div>
  )
}
