import { getTweet } from 'react-tweet/api'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(_req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const tweet = await getTweet(params.id)
    return NextResponse.json(
      { data: tweet ?? null },
      { headers: { 'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=3600' } }
    )
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message ?? 'Bad request.' },
      { status: 400 }
    )
  }
}
