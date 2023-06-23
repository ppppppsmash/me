'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { GrHomeOption, GrUser, GrNote } from 'react-icons/gr'
import { SiGithub, SiInstagram } from 'react-icons/si'

export const MENUS = [
  {
    icon: <GrHomeOption />,
    label: 'Home',
    href: '/'
  },
  {
    icon: <GrUser />,
    label: 'About',
    href: '/about'
  },
  {
    icon: <GrNote />,
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
    href: 'https://instagram.com/_dyermaker?igshid=OGQ5ZDc2ODk2ZA=='
  }
]


export default function Nav() {
  const router = useRouter()
  const navigation = (e: React.MouseEvent<HTMLButtonElement>) => {
    const href = e.currentTarget.dataset.href
    if (href == null) {
      return
    }

    if (href.startsWith('https')) {
      window.open(href, '_blank')
      return
    }

    router.push(href)
  }

  return (
    <nav className='fixed left-1/2 bottom-20 w-full max-w-[500px] rounded-full z-50
    bg-white bg-opacity-10 opacity-0 h-[58px] animate-slide-in-sec -translate-x-1/2
      translate-y-6 backdrop-blur-3xl backdrop-saturate-200 backdrop-brightness-100'>
      <ul className='w-full h-full p-4 pb-5 list-none flex gap-8
      items-center justify-start overflow-x-scroll overflow-y-hidden'>
        {MENUS.map((menu, index) => {
          if (menu.id === 'hr') {
            return (
              <li key={index}>|</li>
            )
          }

          return (
            <li key={index}>
              <button
                className='w-[40px] h-[40px] bg-[#232323] border-0 cursor-pointer
                  rounded-full grid place-items-center focus-visible hover:scale-[1.1]'
                tabIndex={0}
                data-href={menu.href}
                onClick={navigation}
              >
                {menu.icon}
              </button>
            </li>
          )
        })}
        <li>
        </li>
      </ul>
    </nav>
  )
}