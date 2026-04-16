'use client'

import * as React from 'react'
import { Box, FormControl, FormLabel, RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack, Text } from '@chakra-ui/react'

export default function PriceRangeSlider({
  min,
  max,
  value,
  onChange
}: {
  min: number
  max: number
  value: [number, number]
  onChange: (next: [number, number]) => void
}) {
  return (
    <FormControl>
      <FormLabel mb={2}>Price range</FormLabel>
      <Box mb={2}>
        <Text fontSize="sm" color="gray.600">
          ${value[0]} - ${value[1]} / day
        </Text>
      </Box>
      <RangeSlider
        aria-label="Price range slider"
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={(vals) => onChange([vals[0], vals[1]])}
      >
        <RangeSliderTrack bg="gray.100">
          <RangeSliderFilledTrack bg="brand.500" />
        </RangeSliderTrack>
        <RangeSliderThumb boxSize={5} index={0} />
        <RangeSliderThumb boxSize={5} index={1} />
      </RangeSlider>
    </FormControl>
  )
}

