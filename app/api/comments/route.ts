import { NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL,
  token: process.env.UPSTASH_REDIS_TOKEN,
})

const COMMENTS_KEY = 'portfolio_comments'

interface Comment {
  id: string
  user_name: string
  message: string
  rating: number
  created_at: string
}

export async function GET() {
  try {
    const comments = await redis.lrange(COMMENTS_KEY, 0, -1) as Comment[]
    return NextResponse.json(comments)
  } catch (error) {
    console.error('Error fetching comments:', error)
    return NextResponse.json([], { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { user_name, message, rating } = await request.json()

    if (!user_name || !message || !rating) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const comment: Comment = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      user_name: user_name.slice(0, 50),
      message: message.slice(0, 500),
      rating: Math.min(Math.max(Math.round(rating), 1), 5),
      created_at: new Date().toISOString(),
    }

    // Push to front of list (newest first)
    await redis.lpush(COMMENTS_KEY, JSON.stringify(comment))

    return NextResponse.json(comment)
  } catch (error) {
    console.error('Error saving comment:', error)
    return NextResponse.json({ error: 'Failed to save comment' }, { status: 500 })
  }
}
