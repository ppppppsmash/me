'use client'

import { useEffect } from 'react'
import { initSakura } from '@/utils/sakura'

export default function Sakura() {
  useEffect(() => {
    initSakura()
  }, [])

  return (
    <div></div>
  )
}