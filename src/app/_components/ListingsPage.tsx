'use client'

import * as React from 'react'
import type { Car, CarType } from '@/lib/types'
import { isCarAvailableForDates } from '@/lib/availability'
import CarCard from '@/components/CarCard'
import CarCardSkeleton from '@/components/CarCardSkeleton'
import { AnimatePresence, motion } from 'framer-motion'
import { getDateRangeDays } from '@/lib/date'

// ─── Types ────────────────────────────────────────────────────────────────────

type CarFilters = {
  location: string
  pickupISO: string | null
  returnISO: string | null
  priceRange: [number, number]
  carType: CarType | 'All'
}

const CAR_TYPES: (CarType | 'All')[] = ['All', 'Sedan', 'SUV', 'Luxury', 'Electric']

// ─── Sub-components ───────────────────────────────────────────────────────────

function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        height: 32,
        padding: '0 14px',
        borderRadius: 99,
        border: active ? '1.5px solid #1D9E75' : '0.5px solid rgba(0,0,0,0.12)',
        fontSize: 12,
        fontWeight: 500,
        cursor: 'pointer',
        background: active ? '#1D9E75' : 'transparent',
        color: active ? '#fff' : '#6B7280',
        transition: 'all 0.14s',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </button>
  )
}

function FilterLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: '0.09em',
        textTransform: 'uppercase',
        color: '#9CA3AF',
        marginBottom: 5,
      }}
    >
      {children}
    </p>
  )
}

function FilterInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      style={{
        height: 38,
        border: '0.5px solid rgba(0,0,0,0.1)',
        borderRadius: 10,
        padding: '0 11px',
        fontSize: 13,
        background: '#F9FAFB',
        color: '#111827',
        outline: 'none',
        width: '100%',
        transition: 'border-color 0.13s, box-shadow 0.13s',
        ...props.style,
      }}
      onFocus={(e) => {
        e.currentTarget.style.borderColor = '#1D9E75'
        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(29,158,117,0.12)'
        props.onFocus?.(e)
      }}
      onBlur={(e) => {
        e.currentTarget.style.borderColor = 'rgba(0,0,0,0.1)'
        e.currentTarget.style.boxShadow = 'none'
        props.onBlur?.(e)
      }}
    />
  )
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function ListingsPage() {
  const [cars, setCars] = React.useState<Car[]>([])
  const [loading, setLoading] = React.useState(true)

  const [filters, setFilters] = React.useState<CarFilters>({
    location: '',
    pickupISO: null,
    returnISO: null,
    priceRange: [0, 500],
    carType: 'All',
  })

  // ── Data fetching ───────────────────────────────────────────────────────────
  React.useEffect(() => {
    let alive = true
    setLoading(true)
    fetch('/api/cars')
      .then((r) => r.json())
      .then((data) => {
        if (!alive) return
        setCars(data)
        const prices = (data as Car[]).map((c) => c.pricePerDay)
        const min = Math.min(...prices)
        const max = Math.max(...prices)
        setFilters((prev) => ({ ...prev, priceRange: [min, max] }))
        setLoading(false)
      })
      .catch(() => {
        if (!alive) return
        setCars([])
        setLoading(false)
      })
    return () => { alive = false }
  }, [])

  // ── Derived state ───────────────────────────────────────────────────────────
  const priceBounds = React.useMemo(() => {
    const prices = cars.map((c) => c.pricePerDay)
    return {
      min: prices.length ? Math.min(...prices) : 0,
      max: prices.length ? Math.max(...prices) : 500,
    }
  }, [cars])

  const filteredCars = React.useMemo(() => {
    const normalizedLoc = filters.location.trim().toLowerCase()
    return cars.filter((car) => {
      if (normalizedLoc && !car.location.toLowerCase().includes(normalizedLoc)) return false
      if (filters.carType !== 'All' && car.type !== filters.carType) return false
      if (car.pricePerDay < filters.priceRange[0] || car.pricePerDay > filters.priceRange[1])
        return false
      if (filters.pickupISO && filters.returnISO) {
        if (!isCarAvailableForDates(car, filters.pickupISO, filters.returnISO)) return false
      }
      return true
    })
  }, [cars, filters])

  const activeRangeDays = React.useMemo(() => {
    if (!filters.pickupISO || !filters.returnISO) return null
    return getDateRangeDays(filters.pickupISO, filters.returnISO)
  }, [filters.pickupISO, filters.returnISO])

  // ── Helpers ─────────────────────────────────────────────────────────────────
  const handleReset = () =>
    setFilters({
      location: '',
      pickupISO: null,
      returnISO: null,
      priceRange: [priceBounds.min, priceBounds.max],
      carType: 'All',
    })

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div style={{ background: '#F8F9FA', minHeight: '100vh' }}>
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 24px 64px',
        }}
      >

        {/* ── Hero ── */}
        <div style={{ padding: '48px 0 36px' }}>
          <p
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#1D9E75',
              marginBottom: 12,
            }}
          >
            Top-rated rentals · Instant booking
          </p>
          <h1
            style={{
              fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
              fontWeight: 500,
              letterSpacing: '-0.035em',
              lineHeight: 1.05,
              color: '#0D1117',
              marginBottom: 12,
            }}
          >
            Premium cars,{' '}
            <span style={{ color: '#1D9E75' }}>zero hassle.</span>
          </h1>
          <p style={{ fontSize: 16, color: '#6B7280', maxWidth: 440 }}>
            Browse top-rated rentals and lock in availability in seconds.
          </p>
        </div>

        {/* ── Filters bar ── */}
        <div
          style={{
            background: '#fff',
            border: '0.5px solid rgba(0,0,0,0.08)',
            borderRadius: 20,
            padding: '18px 20px',
            marginBottom: 28,
            display: 'flex',
            gap: 16,
            flexWrap: 'wrap',
            alignItems: 'flex-end',
          }}
        >
          {/* Location */}
          <div style={{ flex: '2 1 160px', minWidth: 140 }}>
            <FilterLabel>Location</FilterLabel>
            <FilterInput
              type="text"
              placeholder="City or airport…"
              value={filters.location}
              onChange={(e) => setFilters((p) => ({ ...p, location: e.target.value }))}
            />
          </div>

          {/* Pick-up date */}
          <div style={{ flex: '1.5 1 130px', minWidth: 120 }}>
            <FilterLabel>Pick-up date</FilterLabel>
            <FilterInput
              type="date"
              value={filters.pickupISO ?? ''}
              onChange={(e) =>
                setFilters((p) => ({ ...p, pickupISO: e.target.value || null }))
              }
            />
          </div>

          {/* Return date */}
          <div style={{ flex: '1.5 1 130px', minWidth: 120 }}>
            <FilterLabel>Return date</FilterLabel>
            <FilterInput
              type="date"
              value={filters.returnISO ?? ''}
              onChange={(e) =>
                setFilters((p) => ({ ...p, returnISO: e.target.value || null }))
              }
            />
          </div>

          {/* Car type pills */}
          <div style={{ flex: '3 1 220px', minWidth: 200 }}>
            <FilterLabel>Type</FilterLabel>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {CAR_TYPES.map((t) => (
                <FilterPill
                  key={t}
                  label={t}
                  active={filters.carType === t}
                  onClick={() => setFilters((p) => ({ ...p, carType: t }))}
                />
              ))}
            </div>
          </div>

          {/* Reset */}
          <button
            type="button"
            onClick={handleReset}
            style={{
              height: 38,
              padding: '0 16px',
              borderRadius: 10,
              border: '0.5px solid rgba(0,0,0,0.1)',
              fontSize: 13,
              cursor: 'pointer',
              background: 'transparent',
              color: '#6B7280',
              transition: 'background 0.12s, color 0.12s',
              whiteSpace: 'nowrap',
              alignSelf: 'flex-end',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#F3F4F6'
              e.currentTarget.style.color = '#111827'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = '#6B7280'
            }}
          >
            Reset
          </button>
        </div>

        {/* ── Meta row ── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 18,
            flexWrap: 'wrap',
            gap: 8,
          }}
        >
          <p style={{ fontSize: 14, color: '#6B7280' }}>
            {loading ? (
              'Finding the best matches…'
            ) : (
              <>
                <span style={{ color: '#0D1117', fontWeight: 500 }}>
                  {filteredCars.length}
                </span>{' '}
                car{filteredCars.length !== 1 ? 's' : ''} available
              </>
            )}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {filters.pickupISO && filters.returnISO && activeRangeDays && (
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 500,
                  background: 'rgba(29,158,117,0.1)',
                  color: '#0F6E56',
                  borderRadius: 99,
                  padding: '3px 10px',
                }}
              >
                {activeRangeDays}-day trip estimate
              </span>
            )}
            {(filters.location || filters.pickupISO || filters.returnISO) && (
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 500,
                  background: 'rgba(29,158,117,0.1)',
                  color: '#0F6E56',
                  borderRadius: 99,
                  padding: '3px 10px',
                }}
              >
                Availability filtered for your dates
              </span>
            )}
          </div>
        </div>

        {/* ── Grid ── */}
        <AnimatePresence mode="wait">
          {loading ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                gap: 16,
              }}
            >
              {Array.from({ length: 12 }).map((_, i) => (
                <CarCardSkeleton key={i} />
              ))}
            </div>
          ) : filteredCars.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              style={{
                background: '#fff',
                borderRadius: 20,
                border: '0.5px solid rgba(0,0,0,0.08)',
                padding: '64px 32px',
                textAlign: 'center',
              }}
            >
              <p
                style={{
                  fontSize: 18,
                  fontWeight: 500,
                  letterSpacing: '-0.01em',
                  color: '#0D1117',
                  marginBottom: 8,
                }}
              >
                No cars match your filters
              </p>
              <p style={{ fontSize: 14, color: '#6B7280' }}>
                Try widening your price range, changing the location, or clearing dates.
              </p>
              <button
                type="button"
                onClick={handleReset}
                style={{
                  marginTop: 24,
                  background: 'none',
                  border: 'none',
                  color: '#1D9E75',
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: 'pointer',
                }}
              >
                Clear all filters
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                gap: 16,
              }}
            >
              {filteredCars.map((car, i) => (
                <motion.div
                  key={car.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: i * 0.03 }}
                >
                  <CarCard
                    car={car}
                    pickupISO={filters.pickupISO}
                    returnISO={filters.returnISO}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}