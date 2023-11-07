'use client'

import { LinkIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'

interface WORK_INFO {
  description: string
  skill: string
  infra: string
  url: string
}

export default function HoverCard({
  description,
  skill,
  infra,
  url
}: WORK_INFO) {
  return (
    <div
      className='absolute w-full h-full top-0 bg-white text-gray-800 rounded-md z-50
        p-6 shadow-md hidden group-hover:block group-hover:delay-500
        text-sm animate-scale-up-center transition delay-500 duration-500'
    >
      <p className='flex items-center gap-x-2 mb-3 underline'>
        <LinkIcon className='h-4 w-4 text-black' />
        <Link
          href={{ pathname: url }}
          className='hover:underline hover:text-gray-400'
        >
          ページに遷移
        </Link>
      </p>

      <p className='mb-2'>背景：{ description }</p>
      <p className='mb-2'>技術：{ skill }</p>
      <p className='mb-2'>インフラ：{ infra }</p>
    </div>
  )
}