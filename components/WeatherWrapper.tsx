'use client'

import { useEffect, useState } from 'react'
import Sakura from './Sakura'
import Rainy from './Rainy'
import Windy from './Windy'
import { NewSunnyLight } from './NewSunny'

const getCurrentDate = () => {

}

const WeatherWrapper = () => {
  const [weatherData, setWeatherData] = useState(null)
  const [weatherDescriptionData, setWeatherDescriptionData] = useState(null)
  const date = getCurrentDate()
  const city = 'tokyo'

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/weather?city=${city}`)

      const jsonData = (await response.json()).data
      setWeatherDescriptionData(jsonData.weather[0].description)
      setWeatherData(jsonData.weather[0].main)
    } catch (error) {
      console.log(error)
    }
  }

  console.log(weatherData)

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      {weatherData === 'Rain' && weatherDescriptionData === 'shower rain' && <Rainy />}
      {weatherData === 'Rain' && <Windy />}
      {weatherData === 'Clear' && <NewSunnyLight className="absolute top-0 left-0" />}
    </>
  )
}

export default WeatherWrapper