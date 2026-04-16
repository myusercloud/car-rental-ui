import type { Car } from './types'
import { isDateRangeValid, parseISODate } from './date'

export function isCarAvailableForDates(car: Car, pickupISO?: string | null, returnISO?: string | null) {
  if (!pickupISO || !returnISO) return car.availability.isAvailableNow
  if (!isDateRangeValid(pickupISO, returnISO)) return false

  const from = car.availability.availableFrom
  const to = car.availability.availableTo
  if (!from || !to) return car.availability.isAvailableNow

  const availableFrom = parseISODate(from)
  const availableTo = parseISODate(to)
  const pickup = parseISODate(pickupISO)
  const ret = parseISODate(returnISO)
  if (!availableFrom || !availableTo || !pickup || !ret) return car.availability.isAvailableNow

  // Overlap rule: selected range must be fully inside availability window.
  return availableFrom <= pickup && availableTo >= ret
}

export function getAvailabilityBadgeLabel(car: Car, pickupISO?: string | null, returnISO?: string | null) {
  const available = isCarAvailableForDates(car, pickupISO, returnISO)
  if (available) return 'Available'
  return car.availability.isAvailableNow ? 'Limited' : 'Unavailable'
}

