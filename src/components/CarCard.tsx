'use client'

import * as React from 'react'
import type { Car } from '@/lib/types'
import { getAvailabilityBadgeLabel, isCarAvailableForDates } from '@/lib/availability'
import { formatCurrency } from '@/lib/format'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import RatingStars from './RatingStars'

// ─── Wishlist helpers ──────────────────────────────────────────────────────────

const WISHLIST_KEY = 'rento_wishlist_ids'

function getStoredWishlist(): Set<string> {
  if (typeof window === 'undefined') return new Set()
  try {
    const raw = window.localStorage.getItem(WISHLIST_KEY)
    if (!raw) return new Set()
    const ids = JSON.parse(raw)
    if (!Array.isArray(ids)) return new Set()
    return new Set(ids.filter((x) => typeof x === 'string'))
  } catch {
    return new Set()
  }
}

// ─── Badge color map ───────────────────────────────────────────────────────────

const BADGE_STYLES: Record<string, { bg: string; color: string }> = {
  Available:  { bg: 'rgba(29,158,117,0.12)',  color: '#0F6E56' },
  Limited:    { bg: 'rgba(186,117,23,0.13)',  color: '#854F0B' },
  Unavailable:{ bg: 'rgba(0,0,0,0.06)',       color: '#6B7280' },
}

function getBadgeStyle(label: string) {
  return BADGE_STYLES[label] ?? BADGE_STYLES['Available']
}

// ─── CarCard ───────────────────────────────────────────────────────────────────

export default function CarCard({
  car,
  pickupISO,
  returnISO,
}: {
  car: Car
  pickupISO?: string | null
  returnISO?: string | null
}) {
  const [wishlisted, setWishlisted] = React.useState(false)

  React.useEffect(() => {
    setWishlisted(getStoredWishlist().has(car.id))
  }, [car.id])

  const badgeLabel = getAvailabilityBadgeLabel(car, pickupISO, returnISO)
  const available = isCarAvailableForDates(car, pickupISO, returnISO)
  const badgeStyle = getBadgeStyle(badgeLabel)

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      style={{ borderRadius: 20, overflow: 'hidden' }}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: 20,
          border: '0.5px solid rgba(0,0,0,0.08)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* ── Image ── */}
        <div
          style={{
            position: 'relative',
            height: 190,
            width: '100%',
            background: '#F3F4F6',
            flexShrink: 0,
          }}
        >
          <Image
            src={car.images[0]}
            alt={car.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            style={{ objectFit: 'cover' }}
            loading="lazy"
          />

          {/* Overlay row: badge + wishlist */}
          <div
            style={{
              position: 'absolute',
              top: 10,
              left: 10,
              right: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {/* Availability badge */}
            <span
              style={{
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: '0.07em',
                textTransform: 'uppercase',
                padding: '3px 10px',
                borderRadius: 99,
                ...badgeStyle,
              }}
            >
              {badgeLabel}
            </span>

            {/* Wishlist button */}
            <button
              type="button"
              aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              aria-pressed={wishlisted}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                const current = getStoredWishlist()
                if (current.has(car.id)) current.delete(car.id)
                else current.add(car.id)
                window.localStorage.setItem(WISHLIST_KEY, JSON.stringify(Array.from(current)))
                setWishlisted((v) => !v)
              }}
              style={{
                width: 32,
                height: 32,
                borderRadius: 99,
                border: 'none',
                background: 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(4px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: wishlisted ? '#E24B4A' : '#9CA3AF',
                fontSize: 13,
                transition: 'color 0.13s, transform 0.13s',
                flexShrink: 0,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)' }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
            >
              {wishlisted ? <FaHeart /> : <FaRegHeart />}
            </button>
          </div>
        </div>

        {/* ── Body ── */}
        <div
          style={{
            padding: '16px 18px 18px',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            flex: 1,
          }}
        >
          {/* Name + location */}
          <div>
            <Link href={`/cars/${car.id}`} style={{ textDecoration: 'none' }}>
              <p
                style={{
                  fontSize: 15,
                  fontWeight: 500,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.25,
                  color: '#0D1117',
                  marginBottom: 3,
                }}
              >
                {car.name}
              </p>
            </Link>
            <p
              style={{
                fontSize: 12,
                color: '#9CA3AF',
                display: 'flex',
                alignItems: 'center',
                gap: 3,
              }}
            >
              <svg
                width="9"
                height="11"
                viewBox="0 0 9 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ flexShrink: 0, opacity: 0.6 }}
              >
                <path
                  d="M4.5 0C2.015 0 0 2.015 0 4.5c0 3.375 4.5 6.5 4.5 6.5S9 7.875 9 4.5C9 2.015 6.985 0 4.5 0zm0 6.125A1.625 1.625 0 114.5 2.875a1.625 1.625 0 010 3.25z"
                  fill="currentColor"
                />
              </svg>
              {car.location}
            </p>
          </div>

          {/* Rating */}
          <RatingStars rating={car.rating} reviewCount={car.reviewCount} />

          {/* Price + CTA */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              marginTop: 'auto',
              paddingTop: 12,
              borderTop: '0.5px solid rgba(0,0,0,0.07)',
            }}
          >
            <div>
              <p
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#9CA3AF',
                  marginBottom: 2,
                }}
              >
                Per day
              </p>
              <p
                style={{
                  fontSize: 22,
                  fontWeight: 500,
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                  color: '#0D1117',
                }}
              >
                {formatCurrency(car.pricePerDay)}
              </p>
            </div>

            <Link href={`/cars/${car.id}`} style={{ textDecoration: 'none' }}>
              <button
                type="button"
                style={{
                  height: 36,
                  padding: '0 18px',
                  borderRadius: 10,
                  border: 'none',
                  background: available ? '#1D9E75' : '#E5E7EB',
                  color: available ? '#fff' : '#6B7280',
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: available ? 'pointer' : 'default',
                  transition: 'background 0.13s',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => {
                  if (available) e.currentTarget.style.background = '#0F6E56'
                }}
                onMouseLeave={(e) => {
                  if (available) e.currentTarget.style.background = '#1D9E75'
                }}
              >
                {available ? 'Book now' : 'Unavailable'}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}