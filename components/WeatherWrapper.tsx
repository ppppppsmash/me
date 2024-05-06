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
      const response = await fetch(`/api/weather?city=${city}`)

      const jsonData = (await response.json()).data
      setWeatherData(jsonData.weather[0].main)
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