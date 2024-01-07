'use client'

import Link from 'next/link'
import { AiOutlineHome } from 'react-icons/ai'
import { BiUser } from 'react-icons/bi'
import { RiStickyNote2Line } from 'react-icons/ri'
import { SiGithub, SiInstagram } from 'react-icons/si'

export const MENUS = [
  {
    icon: <AiOutlineHome />,
    label: 'Home',
    href: '/'
  },
  {
    icon: <BiUser />,
    label: 'About',
    href: '/about'
  },
  {
    icon: <RiStickyNote2Line />,
    label: 'Resume',
    href: '/resume'
  },
  //{ id: 'hr' },
  {
    icon: <SiGithub />,
    label: 'Github',
    href: 'https://github.com/ppppppsmash'
  }
]


export default function Nav() {
  return (
    <nav className='fixed px-8 left-1/2 bottom-0 w-11/12 sm:w-full max-w-[320px] rounded-full z-[9999]
    bg-slate-100 bg-opacity-20 opacity-0 h-[58px] animate-slide-in-sec -translate-x-1/2
      translate-y-6 backdrop-blur-3xl backdrop-saturate-200 backdrop-brightness-100'>
      <ul className='w-full h-full list-none flex items-center justify-between
      overflow-x-scroll overflow-y-hidden'>
        { MENUS.map((menu, index) => {
          return (
            <li key={ index } className='px-1'>
              <Link
              className='w-[40px] h-[40px] bg-[#232323] border-0 cursor-pointer text-white
              rounded-full grid place-items-center focus-visible hover:scale-[1.1] duration-300'
                href={{ pathname: menu.href }}
                target={ menu.href?.startsWith('https://') ? '_blank' : '_self' }
                rel={ menu.href?.startsWith('https://') ? 'noreferrer' : undefined }
              >
                { menu.icon }
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}