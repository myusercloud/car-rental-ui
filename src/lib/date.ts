import { differenceInCalendarDays, isValid, parseISO } from 'date-fns'

export function parseISODate(value?: string | null) {
  if (!value) return null
  const d = parseISO(value)
  return isValid(d) ? d : null
}

export function getDateRangeDays(pickupISO: string, returnISO: string) {
  const pickup = parseISODate(pickupISO)
  const ret = parseISODate(returnISO)
  if (!pickup || !ret) return null
  const days = differenceInCalendarDays(ret, pickup)
  if (Number.isNaN(days)) return null
  // Treat same-day pickup/return as 1 day minimum.
  return Math.max(1, days || 1)
}

export function isDateRangeValid(pickupISO: string, returnISO: string) {
  const pickup = parseISODate(pickupISO)
  const ret = parseISODate(returnISO)
  if (!pickup || !ret) return false
  return ret >= pickup
}

