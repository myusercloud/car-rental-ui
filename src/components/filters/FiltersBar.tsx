'use client'

import * as React from 'react'
import { Box, Button, Flex, FormControl, FormLabel, Input } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import type { CarType } from '@/lib/types'
import CarTypeFilter from './CarTypeFilter'
import DateRangePicker from './DateRangePicker'
import PriceRangeSlider from './PriceRangeSlider'

export default function FiltersBar({
  location,
  pickupISO,
  returnISO,
  priceRange,
  carType,
  priceBounds,
  onChange,
  onReset
}: {
  location: string
  pickupISO: string | null
  returnISO: string | null
  priceRange: [number, number]
  carType: CarType | 'All'
  priceBounds: { min: number; max: number }
  onChange: (next: {
    location: string
    pickupISO: string | null
    returnISO: string | null
    priceRange: [number, number]
    carType: CarType | 'All'
  }) => void
  onReset: () => void
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
      <Box
        bg="white"
        borderRadius="20px"
        boxShadow="0 16px 50px rgba(0,0,0,0.05)"
        borderWidth="1px"
        borderColor="blackAlpha.100"
        p={{ base: 4, md: 5 }}
      >
        <Flex direction={{ base: 'column', lg: 'row' }} gap={6}>
          <Box flex="1">
            <FormControl>
              <FormLabel mb={2}>Location</FormLabel>
              <Input
                aria-label="Location search"
                placeholder="City or area"
                value={location}
                onChange={(e) => onChange({ location: e.target.value, pickupISO, returnISO, priceRange, carType })}
              />
            </FormControl>
          </Box>

          <Box flex="1">
            <DateRangePicker
              pickupISO={pickupISO}
              returnISO={returnISO}
              onChange={(next) => onChange({ location, ...next, priceRange, carType })}
            />
          </Box>
        </Flex>

        <Flex direction={{ base: 'column', md: 'row' }} gap={6} mt={6}>
          <Box flex="1">
            <PriceRangeSlider
              min={priceBounds.min}
              max={priceBounds.max}
              value={priceRange}
              onChange={(next) => onChange({ location, pickupISO, returnISO, priceRange: next, carType })}
            />
          </Box>

          <Box flex="1">
            <CarTypeFilter value={carType} onChange={(next) => onChange({ location, pickupISO, returnISO, priceRange, carType: next })} />
          </Box>
        </Flex>

        <Flex mt={6} justify="flex-end">
          <Button variant="ghost" onClick={onReset} borderRadius="14px">
            Clear all
          </Button>
        </Flex>
      </Box>
    </motion.div>
  )
}

