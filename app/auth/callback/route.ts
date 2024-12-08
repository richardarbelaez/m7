import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  return NextResponse.redirect(new URL('/onboarding', requestUrl.origin))
}