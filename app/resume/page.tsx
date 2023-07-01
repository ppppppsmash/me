import { INFO, RESUME, SKILL, SUB_RESUME } from '@/constants'
import Image from 'next/image'
import { AiOutlineHtml5 } from 'react-icons/ai'
import { DiCss3 } from  'react-icons/di'
import { BsFiletypeScss } from 'react-icons/bs'
import { TbBrandJavascript, TbBrandTypescript, TbBrandPython, TbBrandDjango } from 'react-icons/tb'
import { FaPhp, FaAws, FaVuejs, FaReact } from 'react-icons/fa'
import { SiTailwindcss, SiNextdotjs } from 'react-icons/si'

const SKILL_ICONS = [
  {
    icon: <AiOutlineHtml5 size={24} />,
  },
  {
    icon: <DiCss3 size={24} />,
  },
  {
    icon: <BsFiletypeScss size={24} />,
  },
  {
    icon: <TbBrandJavascript size={24} />,
  },
  {
    icon: <FaPhp size={24} />,
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
    icon: <SiNextdotjs size={24} />,
  },
  {
    icon: <TbBrandPython size={24} />,
  },
  {
    icon: <TbBrandDjango size={24} />,
  }
]

export default function Resume() {
  return (
    <div className='w-full max-w-[800px] h-[100vh]'>
      <div className='p-4'>
      <h1 className='text-[2.5rem] opacity-0 translate-y-10 animate-slide-in'>Resume.</h1>
      <h2 className='text-[1.8rem] opacity-0 mt-8 translate-y-10 animate-slide-in'>Skill</h2>
      <div className='flex justify-center gap-2'>
        <ul className='mt-4 ml-1'>
          {SKILL_ICONS.map((icons_list, index) => (
            <li
              key={index}
              className={`leading-normal opacity-0 my-4 translate-y-10 animate-slide-in`}
              style={{animationDelay: `${index*0.1+2.5}s`}}
            >
              {icons_list.icon}
            </li>
          ))}
        </ul>
        <ul className='mt-4 ml-1'>
          {SKILL.map((skill, index) => (
            <li
              key={index}
              className={`leading-normal opacity-0 my-4 translate-y-10 animate-slide-in`}
              style={{animationDelay: `${index*0.1+2.5}s`}}
            >
              <p className='text-[1rem]'>
                {skill}
              </p>
            </li>
          ))}
        </ul>
      </div>
        {/* <ul className='mt-4 ml-1'>
        {RESUME.map((resume, index) => (
          <li
            key={resume.name}
            className={`leading-normal opacity-0 my-4 translate-y-10 animate-slide-in`}
            style={{animationDelay: `${index*0.1+2.5}s`}}
          >
            <p className='text-[1.25rem] font-bold'>{resume.name}</p>
            <p className='text-[1rem] font-bold'>{resume.job}</p>
            <p className='mt-2'>{resume.date}</p>
            <a
              href={resume.url}
              target='_blank'
              rel='noreferrer'
              className='mt-2 no-underline'
            >
              {resume.url}
            </a>

            <ul className='mt-4 list-none grid grid-cols-1'>
              {resume.services.map((service, index) => (
                <li key={service.title}>
                  <a
                    href={service.url}
                    target='_blank'
                    rel='noreferrer'
                    className={`opacity-0 h-full no-underline animate-slide-in`}
                    style={{animationDelay: `${index*0.1+2.5}s`}}
                  >
                    <Image
                      className='w-full h-full object-cover aspect-auto rounded-md'
                      src={service.image}
                      alt={service.title}
                      width={1200}
                      height={600}
                      decoding='async'
                    />
                  </a>
                </li>
              ))}
            </ul>
          </li>
        ))}
        </ul> */}

        <h2 className='mt-8 opacity-0 translate-y-10 animate-slide-in'>実績 / お手伝い</h2>
        <ul className='mt-4 list-none grid grid-cols-2 gap-4'>
          {SUB_RESUME.map((service, index) => (
            <li key={index}>
              <a
                href={service.url}
                target='_blank'
                rel='noreferrer'
                className={`opacity-0 h-full no-underline animate-slide-in`}
                style={{animationDelay: `${index*0.1+2.5}s`}}
              >
                <Image
                  className='w-full h-full object-cover aspect-auto rounded-md'
                  src={service.image}
                  alt={service.title}
                  width={1200}
                  height={630}
                  decoding='async'
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
