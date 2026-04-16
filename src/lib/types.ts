export type CarType = 'SUV' | 'Sedan' | 'Luxury' | 'Electric'

export type Transmission = 'Automatic' | 'Manual'
export type FuelType = 'Petrol' | 'Diesel' | 'Hybrid' | 'Electric'

export type Car = {
  id: string
  name: string
  type: CarType
  pricePerDay: number
  location: string
  rating: number
  reviewCount: number
  availability: {
    isAvailableNow: boolean
    availableFrom?: string
    availableTo?: string
  }
  specs: {
    seats: number
    transmission: Transmission
    fuelType: FuelType
  }
  images: string[]
}

