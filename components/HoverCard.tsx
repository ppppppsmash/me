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
      className='absolute -top-40 bg-white text-gray-800 rounded-md z-50
        p-6 shadow-md hidden group-hover:block text-sm animate-scale-up-center'
    >
      <p className='flex gap-x-2 mb-3'>
        <LinkIcon className='h-5 w-5 text-amber-400' />
        <Link
          href={{ pathname: url }}
          className='hover:underline hover:text-gray-500'
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