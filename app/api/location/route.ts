import { NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL,
  token: process.env.UPSTASH_REDIS_TOKEN,
})


export async function GET() {
  try {
    const visitorCount = await redis.get('visitor_count')
    const lastVisitorCountry = await redis.get('last_visitor_country')

    return new Response(JSON.stringify({
      visitorCount: visitorCount || 0,
      lastVisitorCountry: lastVisitorCountry || 'Unknown',
    }))
  } catch (error) {
    console.error('Error retrieving visitor stats:', error)
    return NextResponse.json({ error: 'Failed to retrieve visitor stats' }, { status: 500 })
  }
}

export async function POST(request: any) {
  const { country } = await request.json()

  try {
    await redis.set('last_visitor_country', country)

    await redis.incr('visitor_count')

    const data = await redis.get('last_visitor_country')
    console.log(data)

    return new Response(JSON.stringify({ message: 'Geo information saved' }))
  } catch (error) {
    console.error('Error saving geo information:', error)
    return NextResponse.json({ error: 'Failed to save geo information' }, { status: 500 })
  }
}