'use client'

import * as React from 'react'
import { Box, Flex, IconButton } from '@chakra-ui/react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

export default function CarGallery({ images, name }: { images: string[]; name: string }) {
  const safeImages = images.filter(Boolean)
  const [active, setActive] = React.useState(0)

  React.useEffect(() => {
    setActive(0)
  }, [safeImages.join('|')])

  if (!safeImages.length) return null

  const onPrev = () => setActive((v) => (v - 1 + safeImages.length) % safeImages.length)
  const onNext = () => setActive((v) => (v + 1) % safeImages.length)

  return (
    <Box>
      <Box position="relative" borderRadius="22px" overflow="hidden" bg="gray.50">
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <Box position="relative" height={{ base: '260px', md: '420px' }}>
              <Image
                src={safeImages[active]}
                alt={`${name} - image ${active + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 66vw"
                style={{ objectFit: 'cover' }}
                loading="lazy"
              />
            </Box>
          </motion.div>
        </AnimatePresence>

        <Flex position="absolute" top={4} left={4} right={4} justify="space-between" pointerEvents="none">
          <IconButton
            aria-label="Previous image"
            icon={<FiChevronLeft />}
            variant="solid"
            size="sm"
            pointerEvents="auto"
            borderRadius="999px"
            onClick={onPrev}
          />
          <IconButton
            aria-label="Next image"
            icon={<FiChevronRight />}
            variant="solid"
            size="sm"
            pointerEvents="auto"
            borderRadius="999px"
            onClick={onNext}
          />
        </Flex>
      </Box>

      {safeImages.length > 1 ? (
        <Flex mt={3} gap={3} overflowX="auto" pb={2}>
          {safeImages.map((src, i) => (
            <Box
              key={src + i}
              role="button"
              tabIndex={0}
              aria-current={i === active}
              onClick={() => setActive(i)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setActive(i)
              }}
              borderRadius="16px"
              overflow="hidden"
              borderWidth="2px"
              borderColor={i === active ? 'brand.500' : 'transparent'}
              cursor="pointer"
              boxShadow={i === active ? '0 10px 30px rgba(20,184,166,0.25)' : 'none'}
              transition="transform 160ms ease, border-color 160ms ease"
              _hover={{ transform: 'translateY(-1px)' }}
              minW="92px"
            >
              <Box position="relative" width="92px" height="62px">
                <Image src={src} alt={`${name} thumbnail ${i + 1}`} fill style={{ objectFit: 'cover' }} loading="lazy" />
              </Box>
            </Box>
          ))}
        </Flex>
      ) : null}
    </Box>
  )
}

