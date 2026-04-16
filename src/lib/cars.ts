import carsData from '@/data/cars.json'
import type { Car } from './types'

export const cars: Car[] = carsData as Car[]

export function getCars() {
  return cars
}

export function getCarById(id: string) {
  return cars.find((c) => c.id === id)
}

