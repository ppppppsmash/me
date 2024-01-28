'use client'

import { useEffect } from 'react'
import { initSnowy } from '@/utils/snow'

export default function Snowy() {
  useEffect(() => {
    initSnowy()
  }, [])

  return (
    <div></div>
  )
}