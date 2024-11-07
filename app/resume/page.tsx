import Link from 'next/link'

import { SKILL, SUB_RESUME } from '@/constants'
import { SiRubyonrails } from 'react-icons/si'
import ProximityCard from '@/components/ProximityCard'
import {
  IconBrandJavascript,
  IconBrandPhp,
  IconBrandPython,
  IconBrandNodejs,
  IconBrandTailwind,
  IconBrandTypescript,
  IconBrandAws,
  IconBrandVue,
  IconBrandReact,
  IconBrandSvelte,
  IconBrandAstro,
  IconBrandDjango,
} from "@tabler/icons-react";
import { IconCloud } from '@/components/IconCloud'

const slugs = [
  'vuedotjs',
  'nuxtdotjs',
  'react',
  'nextdotjs',
  'svelte',
  'astro',
  'html5',
  'php',
  'nodedotjs',
  'wordpress',
  'nestjs',
  'python',
  'django',
  'tailwindcss',
  'rubyonrails',
  'amazonaws',
  'googlecloud',
  'prisma',
  'drizzle',
  'mysql',
  'postgresql',
];



const SKILL_ICONS = [
  {
    icon: <IconBrandJavascript size={24} />,
  },
  {
    icon: <IconBrandPhp size={24} />,
  },
  {
    icon: <IconBrandPython size={24} />,
  },
  {
    icon: <IconBrandNodejs size={24} />,
  },
  {
    icon: <IconBrandTailwind size={24} />,
  },
  {
    icon: <IconBrandTypescript size={24} />,
  },
  {
    icon: <IconBrandAws size={24} />,
  },
  {
    icon: <IconBrandVue size={24} />,
  },
  {
    icon: <IconBrandReact size={24} />,
  },
  {
    icon: <IconBrandSvelte size={24} />,
  },
  {
    icon: <SiRubyonrails size={26} />,
  },
  {
    icon: <IconBrandDjango size={24} />,
  },
  {
    icon: <IconBrandAstro size={24} />
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
          <div className="relative flex size-full max-w-lg items-center justify-center overflow-hidden bg-background px-6 pb-6 pt-8">
            <IconCloud iconSlugs={slugs} />
          </div>
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
                  className='duration-200 hover:font-bold hover:text-white/70'
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
