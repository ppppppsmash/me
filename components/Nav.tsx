'use client'
import Link from 'next/link'
import { GrHomeOption, GrUser, GrNote } from 'react-icons/gr'
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
  { id: 'hr' },
  {
    icon: <SiGithub />,
    label: 'Github',
    href: 'https://github.com/ppppppsmash'
  },
  {
    icon: <SiInstagram />,
    label: 'Instagram',
    href: 'https://instagram.com/_dyermaker?igshid=MzMyNGUyNmU2YQ%3D%3D&utm_source=qr'
  }
]


export default function Nav() {
  return (
    <nav className='fixed px-2 left-1/2 bottom-0 w-11/12 sm:w-full max-w-[500px] rounded-full z-50
    bg-slate-100 bg-opacity-20 opacity-0 h-[58px] animate-slide-in-sec -translate-x-1/2
      translate-y-6 backdrop-blur-3xl backdrop-saturate-200 backdrop-brightness-100'>
      <ul className='w-full h-full p-5 pb-5 list-none flex gap-8
      items-center justify-start overflow-x-scroll overflow-y-hidden'>
        {MENUS.map((menu, index) => {
          if (menu.id === 'hr') {
            return (
              <li key={index}>|</li>
            )
          }

          return (
            <li key={index}>
              <Link
              className='w-[40px] h-[40px] bg-[#232323] border-0 cursor-pointer text-white
              rounded-full grid place-items-center focus-visible hover:scale-[1.1]'
                href={{pathname: menu.href}}
                target={menu.href?.startsWith('https://') ? '_blank' : '_self' }
                rel={menu.href?.startsWith('https://') ? 'noreferrer' : undefined }
              >
                {menu.icon}
              </Link>
            </li>
          )
        })}
        <li>
        </li>
      </ul>
    </nav>
  )
}