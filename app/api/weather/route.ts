import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: any) {
  const { searchParams } = new URL(request.url)

  const lat = searchParams.get('lat')
  const lon = searchParams.get('lon')
  const city = searchParams.get('city')

  let url: string
  if (lat && lon) {
    url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}`
  } else {
    url = `https://api.openweathermap.org/data/2.5/weather?q=${city || 'tokyo'}&appid=${process.env.WEATHER_API_KEY}`
  }

  const res = await fetch(url)

  try {
    const data = await res.json()

    return new Response(JSON.stringify({ data }))
  } catch (error) {
    console.error('Error parsing JSON:', error)

    return NextResponse.error()
  }
}
