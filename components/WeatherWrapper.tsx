"use client";

import { useEffect, useState } from "react";
import Sakura from "./Sakura";
import Rainy from "./Rainy";
import Windy from "./Windy";
import Sunny from "./Sunny";
import Thunderstorm from "./Thunderstorm";
import Drizzle from "./Drizzle";
import Snow from "./Snow";
import Clouds from "./Clouds";
import Fog from "./Fog";
import WeatherBadge from "./WeatherBadge";

const isSakuraSeason = () => {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  // 3/1 ~ 4/15
  return (month === 3) || (month === 4 && day <= 15);
};

const WeatherWrapper = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [weatherDescriptionData, setWeatherDescriptionData] = useState(null);
  const showSakura = isSakuraSeason();
  const city = "tokyo";

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/weather?city=${city}`);

      const jsonData = (await response.json()).data;
      setWeatherDescriptionData(jsonData.weather[0].description);
      setWeatherData(jsonData.weather[0].main);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(weatherData);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {/* Preview: Sunny */}
      <WeatherBadge weather={weatherData} />
      {weatherData === "Thunderstorm" && <Thunderstorm />}
      {weatherData === "Drizzle" && <Drizzle />}
      {weatherData === "Snow" && <Snow />}
      {weatherData === "Clouds" && <Clouds />}
      {weatherData === "Fog" && <Fog />}
      {weatherData === "Mist" && <Fog />}
      {weatherData === "Haze" && <Fog />}
      {weatherData === "Rain" && weatherDescriptionData === "shower rain" && <Rainy />}
      {weatherData === "Rain" && <Windy />}
      {weatherData === "Clear" && <Sunny />}
      {showSakura && <Sakura />}
    </>
  )
}

export default WeatherWrapper;
