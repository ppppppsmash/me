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
  const [location, setLocation] = useState("");
  const showSakura = isSakuraSeason();

  useEffect(() => {
    const fetchLocation = async (lat: number, lon: number) => {
      try {
        const lang = navigator.language || "en";
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&accept-language=${lang}&zoom=3`
        );
        const data = await res.json();
        const addr = data.address || {};
        setLocation(addr.country || "");
      } catch {
        setLocation("");
      }
    };

    const fetchWeather = async (lat?: number, lon?: number) => {
      try {
        const params = lat && lon
          ? `lat=${lat}&lon=${lon}`
          : "city=tokyo";
        const response = await fetch(`/api/weather?${params}`);
        const jsonData = (await response.json()).data;
        setWeatherDescriptionData(jsonData.weather[0].description);
        setWeatherData(jsonData.weather[0].main);

        if (!lat || !lon) {
          setLocation(`${jsonData.sys?.country || ""} ${jsonData.name || ""}`);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchGeoByIP = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        if (data.latitude && data.longitude) {
          fetchWeather(data.latitude, data.longitude);
          fetchLocation(data.latitude, data.longitude);
        } else {
          fetchWeather();
        }
      } catch {
        fetchWeather();
      }
    };

    fetchGeoByIP();
  }, []);

  return (
    <>
      {/* Preview: Sunny */}
      <WeatherBadge weather={weatherData} location={location} />
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
