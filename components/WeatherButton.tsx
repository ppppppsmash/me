'use client'

import { useState } from 'react'
import { BsCloudRain, BsCloudRainFill, BsCloudSnow, BsCloudSnowFill } from 'react-icons/bs'

import Rainy from '@/components/Rainy'
import Snowy from '@/components/Snowy'

export default function WeatherButton() {
  const [defaultWeather, SetDefaultWeather] = useState<boolean>(true)
  const switchHandler = () => {
    SetDefaultWeather(prevState => !prevState)
  }

  return (
    <div className='absolute right-[10%] top-[4%] z-[9999]'>
    <button className='rounded-lg border-[1px] hover:border-2 duration-150 border-white p-2 cursor-pointer group' onClick={switchHandler}>
      {defaultWeather ? (
        <>
          <BsCloudRain className='group-hover:hidden w-4 h-4' />
          <BsCloudRainFill className='group-hover:block hidden w-4 h-4' />
        </>
      ) : (
        <>
          <BsCloudSnow className='group-hover:hidden w-4 h-4' />
          <BsCloudSnowFill className='group-hover:block hidden w-4 h-4' />
        </>
      )}
    </button>

    {defaultWeather ? <Snowy /> : <Rainy />} {/* isSnowy の状態に応じて表示するコンポーネントを切り替え */}
  </div>
  )
}