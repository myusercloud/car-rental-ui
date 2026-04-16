import { notFound } from 'next/navigation'
import { getCarById } from '@/lib/cars'
import CarDetailsClient from './CarDetailsClient'

export default function CarDetailsPage({ params }: { params: { id: string } }) {
  const car = getCarById(params.id)
  if (!car) notFound()
  return <CarDetailsClient car={car} />
}

