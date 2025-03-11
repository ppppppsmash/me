import Link from 'next/link'

import { SUB_RESUME } from '@/constants'
import ProximityCard from '@/components/ProximityCard'
import { IconCloud } from '@/components/IconCloud'
import { AuroraText } from '@/components/AuroraText';

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

export default function Resume() {
  const images = slugs.map(
    (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`,
  );

  return (
    <div className='w-full max-w-[800px] md:h-full'>
      <div className='p-4 pb-[170px]'>
        <h1 className='text-2xl sm:text-[2.5rem] opacity-0 translate-y-10 animate-slide-in flex items-center'>
          <AuroraText className='font-bold'>
            Resume
          </AuroraText>
        </h1>
        <h2 className='text-[1.8rem] opacity-0 mt-8 translate-y-10 animate-slide-in'>Skill</h2>

        <div className='flex justify-center gap-2'>
          <div className="relative flex size-full max-w-lg items-center justify-center overflow-hidden bg-background px-6 pb-6 pt-8">
            <IconCloud images={images} />
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
