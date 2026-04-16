'use client'

import * as React from 'react'
import type { CarType } from '@/lib/types'
import { Button, ButtonGroup, FormControl, FormLabel } from '@chakra-ui/react'

const OPTIONS: Array<{ key: CarType | 'All'; label: string }> = [
  { key: 'All', label: 'All' },
  { key: 'SUV', label: 'SUV' },
  { key: 'Sedan', label: 'Sedan' },
  { key: 'Luxury', label: 'Luxury' },
  { key: 'Electric', label: 'Electric' }
]

export default function CarTypeFilter({
  value,
  onChange
}: {
  value: CarType | 'All'
  onChange: (next: CarType | 'All') => void
}) {
  return (
    <FormControl>
      <FormLabel mb={2}>Car type</FormLabel>
      <ButtonGroup isAttached variant="outline" width="100%" overflowX="auto">
        {OPTIONS.map((opt) => (
          <Button
            key={opt.key}
            onClick={() => onChange(opt.key)}
            bg={value === opt.key ? 'brand.500' : undefined}
            color={value === opt.key ? 'white' : undefined}
            borderColor={value === opt.key ? 'brand.500' : undefined}
            _hover={value === opt.key ? { bg: 'brand.500' } : undefined}
            borderRadius="12px"
            flex="1"
          >
            {opt.label}
          </Button>
        ))}
      </ButtonGroup>
    </FormControl>
  )
}

