'use client'

import { useEffect } from 'react'
import { initRainy } from '@/utils/rain'

export default function Rainy() {
  useEffect(() => {
    initRainy()
  }, [])

  return (
    <div></div>
  )
}