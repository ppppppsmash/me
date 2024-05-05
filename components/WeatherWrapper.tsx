'use client'

import { useEffect, useState } from 'react'
import Sakura from './Sakura'

const getCurrentDate = () => {

}

const WeatherWrapper = () => {
  const [weatherData, setWeatherData] = useState(null)
  const date = getCurrentDate()
  const city = 'tokyo'

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/weather?address=${city}`)

      const jsonData = (await response.json()).data
      setWeatherData(jsonData)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <Sakura />
    </>
  )
}

export default WeatherWrapper