import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: any) {
  const { searchParams } = new URL(request.url)

  const city = searchParams.get('city')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}`

  const res = await fetch(url)

  try {
    const data = await res.json()

    return new Response(JSON.stringify({ data }))
  } catch (error) {
    console.error('Error parsing JSON:', error)

    return NextResponse.error()
  }
}
