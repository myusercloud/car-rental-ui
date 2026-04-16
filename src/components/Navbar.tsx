'use client'

import * as React from 'react'
import { FiSearch } from 'react-icons/fi'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Navbar() {
  const router = useRouter()
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const onSearchShortcut = React.useCallback(() => {
    const el = document.getElementById('filters')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      router.push('/')
    }
  }, [router])

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: scrolled ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.72)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: scrolled
          ? '0.5px solid rgba(0,0,0,0.09)'
          : '0.5px solid rgba(0,0,0,0.05)',
        transition: 'background 0.2s, border-color 0.2s',
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          height: 68,
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* ── Left: logo + tagline ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link href="/" aria-label="Go to homepage" style={{ textDecoration: 'none' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                cursor: 'pointer',
              }}
            >
              {/* Logo mark */}
              <div style={{ position: 'relative', width: 28, height: 28, flexShrink: 0 }}>
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: 8,
                    background: '#1D9E75',
                    opacity: 0.12,
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div
                    style={{
                      width: 9,
                      height: 9,
                      borderRadius: 99,
                      background: '#1D9E75',
                    }}
                  />
                </div>
              </div>

              {/* Wordmark */}
              <span
                style={{
                  fontSize: 17,
                  fontWeight: 500,
                  letterSpacing: '-0.03em',
                  color: '#0D1117',
                }}
              >
                Rento
              </span>
            </div>
          </Link>

          {/* Divider + tagline — hidden on mobile */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
            className="nav-tagline"
          >
            <div
              style={{
                width: 1,
                height: 14,
                background: 'rgba(0,0,0,0.12)',
              }}
            />
            <span
              style={{
                fontSize: 13,
                color: '#9CA3AF',
                whiteSpace: 'nowrap',
              }}
            >
              Premium car rentals
            </span>
          </div>
        </div>

        {/* ── Right: actions ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {/* Search shortcut button */}
          <button
            type="button"
            aria-label="Search cars"
            onClick={onSearchShortcut}
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              border: '0.5px solid rgba(0,0,0,0.1)',
              background: 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#6B7280',
              fontSize: 15,
              transition: 'background 0.12s, color 0.12s, border-color 0.12s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#F3F4F6'
              e.currentTarget.style.color = '#0D1117'
              e.currentTarget.style.borderColor = 'rgba(0,0,0,0.15)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = '#6B7280'
              e.currentTarget.style.borderColor = 'rgba(0,0,0,0.1)'
            }}
          >
            <FiSearch />
          </button>

          {/* Sign in */}
          <Link href="/signin" style={{ textDecoration: 'none' }}>
            <button
              type="button"
              style={{
                height: 36,
                padding: '0 16px',
                borderRadius: 10,
                border: '0.5px solid rgba(0,0,0,0.1)',
                background: 'transparent',
                fontSize: 13,
                fontWeight: 500,
                color: '#374151',
                cursor: 'pointer',
                transition: 'background 0.12s, color 0.12s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#F3F4F6'
                e.currentTarget.style.color = '#0D1117'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = '#374151'
              }}
            >
              Sign in
            </button>
          </Link>

          {/* Avatar */}
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 99,
              background: 'rgba(29,158,117,0.12)',
              border: '0.5px solid rgba(29,158,117,0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 13,
              fontWeight: 500,
              color: '#0F6E56',
              cursor: 'pointer',
              flexShrink: 0,
              userSelect: 'none',
            }}
          >
            L
          </div>
        </div>
      </div>

      {/* Hide tagline on small screens */}
      <style>{`
        @media (max-width: 640px) {
          .nav-tagline { display: none !important; }
        }
      `}</style>
    </nav>
  )
}