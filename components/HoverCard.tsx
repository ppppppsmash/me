'use client'

interface WORK_INFO {
  description: string
  skill: string
  infra: string
}

export default function HoverCard({
  description,
  skill,
  infra
}: WORK_INFO) {
  return (
    <div
      className='absolute -top-40 bg-white text-gray-800 rounded-md z-50
        p-6 shadow-md hidden group-hover:block text-sm animate-scale-up-center'
    >
      <p className='mb-2'>背景：{ description }</p>
      <p className='mb-2'>技術：{ skill }</p>
      <p className='mb-2'>インフラ：{ infra }</p>
    </div>
  )
}