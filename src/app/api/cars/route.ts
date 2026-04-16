import { NextResponse } from 'next/server'
import { getCars } from '@/lib/cars'

export async function GET() {
  return NextResponse.json(getCars())
}

