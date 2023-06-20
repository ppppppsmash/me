import { INFO, RESUME, SUB_RESUME } from '@/constants'

export default function Resume() {
  return (
    <div className='w-full max-w-[1000px] h-[100vh]'>
      <div className='p-4'>
      <h1 className='text-[2.5rem] animate-slide-in'>Resume.</h1>
      <h2 className='text-[1.8rem] mt-8 animate-slide-in'>職歴</h2>
        <ul className='mt-4 ml-1'>
        {RESUME.map((resume, index) => (
          <li
            key={resume.name}
            className={`leading-normal my-4 animate-slide-in animation-delay-${index*100+1300}`}
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
                    className={`h-full no-underline animate-slide-in animation-delay-${index*100+1300}`}
                  >
                    <img
                      className='w-full h-full object-cover aspect-auto'
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
        </ul>

        <h2 className=''>副業 / お手伝い</h2>
        <ul className='mt-4 list-none grid grid-cols-2 gap-2'>
          {SUB_RESUME.map((service, index) => (
            <li key={index}>
              <a
                href={service.url}
                target='_blank'
                rel='noreferrer'
                className={`h-full no-underline animate-slide-in animation-delay-${index*100+1300}`}
              >
                <img
                  className='w-full h-full object-cover aspect-auto'
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
