"use client"

import { useEffect, useState } from 'react'
import gsap from 'gsap'
import useGeoLocation from 'react-ipgeolocation'

const SIDES = ['top', 'right', 'bottom', 'left']

const CONFIG = {
  perspective: false,
  reduced: 1,
  rx: -24,
  ry: -24,
  bn: 5,
  hl: 1,
  hu: 359,
  sl: 1,
  su: 4,
  dl: 0,
  du: 5,
  cell: 5,
  depth: 100,
}

const Home = () => {
  const [visitorStats, setVisitorStats] = useState({ visitorCount: 0, lastVisitorCountry: 'Unknown' })

  useEffect(() => {
    const GENERATE_BEAMS = () => {
      for (const SIDE of SIDES) {
        const CONTAINER = document.querySelector(`.warp__side--${SIDE}`) as HTMLElement
        CONTAINER.innerHTML = ''
        const NUMBER = gsap.utils.random(1, CONFIG.bn, 1)
        const BEAMS = new Array(NUMBER).fill({}).map(() => {
          return {
            hue: gsap.utils.random(CONFIG.hl, CONFIG.hu, 1),
            x: gsap.utils.random(0, (100 / CONFIG.cell) - 1, 1),
            speed: gsap.utils.random(CONFIG.sl, CONFIG.su),
            delay: gsap.utils.random(CONFIG.dl, CONFIG.du),
          }
        })
        for (const BEAM of BEAMS) {
          CONTAINER.appendChild(Object.assign(document.createElement('div'), {
            className: 'beam',
            style: `
              --hue: ${BEAM.hue}
              --ar: ${gsap.utils.random(1, 10, 1)}
              --x: ${BEAM.x}
              --speed: ${BEAM.speed}
              --delay: ${BEAM.delay}
            `,
          }))
        }
      }
    }

    const UPDATE_CAMERA = () => {
      document.documentElement.style.setProperty('--rx', String(CONFIG.rx))
      document.documentElement.style.setProperty('--ry', String(CONFIG.ry))
    }

    const UPDATE_PERSPECTIVE = () => {
      document.documentElement.style.setProperty('--perspective', String(CONFIG.depth))
    }

    const UPDATE_MOTION_PREF = () => {
      document.documentElement.style.setProperty('--reduced', String(CONFIG.reduced))
    }

    GENERATE_BEAMS()
    UPDATE_CAMERA()
    UPDATE_PERSPECTIVE()
    UPDATE_MOTION_PREF()
  }, [])

  const location = useGeoLocation()

  useEffect(() => {
    if (location.country) {
      const saveGeoInfo = async () => {
        try {
          const response = await fetch('/api/location', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ country: location.country }),
          })

          if (!response.ok) {
            throw new Error('Failed to save geo information')
          }

        } catch (error) {
          console.error('Error saving geo info:', error)
        }
      }

      saveGeoInfo()
    }
  }, [location.country])

  useEffect(() => {
    const fetchVisitorStats = async () => {
      try {
        const response = await fetch('/api/location')
        const data = await response.json()
        setVisitorStats(data)
      } catch (error) {
        console.error('Error fetching visitor stats:', error)
      }
    }

    fetchVisitorStats()
  }, [])

  return (
    <div className="scene">
      <div className="wrapper">
        <article className="brand from-teal-400 to-fuchsia-600 rounded-[15px] p-[2px]
          bg-[conic-gradient(from_var(--shimmer-angle),theme(colors.teal.400)_30%,theme(colors.slate.100)_40%,theme(colors.amber.600)_20%)]
          animate-[shimmer_2.5s_linear_infinite]">
            <h1 className="text-[2.5rem] translate-y-5 animate-slide-in-title font-bold
              min-w-[165px] opacity-0 pr-2 transform py-8 rounded-[15px] bg-white dark:bg-black font-panton text-black dark:text-white"
            >Kurosawa&#39s portfolio</h1>
        </article>
        
        <div className="warp">
          {SIDES.map((side) => (
            <div key={side} className={`warp__side warp__side--${side}`}></div>
          ))}
        </div>
      </div>
      {/* <p>Total Visitors: {visitorStats.visitorCount}</p>
      <p>Last Visitor Country: {visitorStats.lastVisitorCountry}</p> */}
    </div>
  )
}

export default Home
