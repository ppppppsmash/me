'use client'

import React, { useEffect, useState } from 'react'
import useGeoLocation from 'react-ipgeolocation'

import { UsersIcon } from '@heroicons/react/24/outline'


export default function HeaderStatus() {
  const [visitorStats, setVisitorStats] = useState({ visitorCount: 0, lastVisitorCountry: '' })

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

  const getCountryInfo = (countryCode: any) => {
    switch (countryCode) {
      case 'JP':
        return { name: '日本', flag: '🇯🇵' }
      case 'US':
        return { name: 'アメリカ', flag: '🇺🇸' }
      case 'CN':
        return { name: '支那', flag: '🇨🇳' }
      case 'KR':
        return { name: '韓国', flag: '🇰🇷' }
      case 'GB':
        return { name: 'イギリス', flag: '🇬🇧' }
      case 'DE':
        return { name: 'ドイツ', flag: '🇩🇪' }
      case 'FR':
        return { name: 'フランス', flag: '🇫🇷' }
      case 'IN':
        return { name: 'インド', flag: '🇮🇳' }
      default:
        return { name: countryCode, flag: '' }
    }
  }

  const { name: countryName, flag: countryFlag } = getCountryInfo(visitorStats.lastVisitorCountry)

  return (
    <div className="fixed bottom-8 right-2">
      <div className="flex justify-end items-center space-x-5 text-xs pt-4 pr-6">
        <p className="flex items-center space-x-1">
          <UsersIcon className="w-5 h-5" />
          <span>総閲覧数: {visitorStats.visitorCount}人</span></p>
          <p>最近の訪問者： {countryName} {countryFlag} より</p>
      </div>
    </div>
  )
}