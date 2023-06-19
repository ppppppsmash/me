import Link from 'next/link'

interface LinkProps {
  label: string
  href: string
}

interface Props {
  prev: LinkProps
  next: LinkProps
}

export default function Nav({ prev, next}: Props) {
  return (
    <nav className='w-full backdrop-blur-lg fixed left-0 bottom-0 '>
      <ul className='w-full p-4 pb-5 list-none flex items-center'>
        <li>
          {prev !=null && (
            <Link
              href={prev.href}
              className='text-sm no-underline flex items-center gap-2'
            >
              {prev.label}
            </Link>
          )}
        </li>
        <li>
          {next !=null && (
            <Link
              href={next.href}
              className='text-sm no-underline flex items-center gap-2'
            >
              {next.label}
            </Link>
          )}
        </li>
      </ul>
    </nav>
  )
}