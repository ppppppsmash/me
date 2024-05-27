'use client'

import { useEffect } from 'react'
import { initWindy } from '@/utils/windy'

export default function Windy() {
  initWindy()

  return (
    <div></div>
  )
}