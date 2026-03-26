"use client";

import React, { useEffect, useState } from "react";
import useGeoLocation from "react-ipgeolocation";
import { UsersIcon, FlagIcon } from "@heroicons/react/24/outline";
import ShinyText from "@/components/ShinyText";

export default function HeaderStatus() {
  const [visitorStats, setVisitorStats] = useState({ visitorCount: 0, lastVisitorCountry: '..' })
  const [isLoaded, setIsLoaded] = useState(false)
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
        setIsLoaded(true)
      } catch (error) {
        console.error('Error fetching visitor stats:', error)
        setIsLoaded(true)
      }
    }

    fetchVisitorStats()
  }, [])

  const getCountryInfo = (countryCode: string) => {
    switch (countryCode) {
      case "JP":
        return { name: "日本", flag: "🇯🇵" };
      case "US":
        return { name: "アメリカ", flag: "🇺🇸" };
      case "CN":
        return { name: "Covid-19", flag: "🦠" };
      case "KR":
        return { name: "韓国", flag: "🇰🇷" };
      case "GB":
        return { name: "イギリス", flag: "🇬🇧" };
      case "DE":
        return { name: "ドイツ", flag: "🇩🇪" };
      case "FR":
        return { name: "フランス", flag: "🇫🇷" };
      case "IN":
        return { name: "インド", flag: "🇮🇳" };
      case "CA":
        return { name: "カナダ", flag: "🇨🇦" };
      case "IT":
        return { name: "イタリア", flag: "🇮🇹" };
      case "ES":
        return { name: "スペイン", flag: "🇪🇸" };
      case "BR":
        return { name: "ブラジル", flag: "🇧🇷" };
      case "ZA":
        return { name: "南アフリカ", flag: "🇿🇦" };
      case "MX":
        return { name: "メキシコ", flag: "🇲🇽" };
      case "AU":
        return { name: "オーストラリア", flag: "🇦🇺" };
      case "NZ":
        return { name: "ニュージーランド", flag: "🇳🇿" };
      default:
        return { name: countryCode, flag: "" };
    }
  }

  const { name: countryName, flag: countryFlag } = getCountryInfo(visitorStats.lastVisitorCountry)

  const summary = [
    `総閲覧数: ${String(visitorStats.visitorCount)}人`,
    `最近の訪問者: ${countryName}`
  ]

  return (
    <div className="fixed top-2 right-2">
      <div className="flex justify-end items-center space-x-5 text-xs pt-2 pr-6">
        <div className="flex items-center flex-start">
          {isLoaded && visitorStats.visitorCount > 0 && (
            <div className="flex flex-col items-start gap-2">
              <div className="flex items-center gap-2">
                <UsersIcon className="w-3 h-3 dark:text-white text-gray-800" />
                <ShinyText text={summary[0]} className="dark:text-white text-gray-800" />
              </div>
              <div className="flex items-center gap-2">
                <FlagIcon className="w-3 h-3 dark:text-white text-gray-800" />
                <ShinyText text={summary[1]} className="dark:text-white text-gray-800" /> {countryFlag}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}