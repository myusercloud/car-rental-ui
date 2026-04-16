'use client'

import * as React from 'react'
import { Box, FormControl, FormErrorMessage, Input, VStack } from '@chakra-ui/react'

function toInputValue(iso?: string | null) {
  return iso ?? ''
}

export default function DateRangePicker({
  pickupISO,
  returnISO,
  onChange
}: {
  pickupISO: string | null
  returnISO: string | null
  onChange: (next: { pickupISO: string | null; returnISO: string | null }) => void
}) {
  const error = React.useMemo(() => {
    if (!pickupISO || !returnISO) return ''
    if (returnISO < pickupISO) return 'Return date must be on or after pickup.'
    return ''
  }, [pickupISO, returnISO])

  return (
    <VStack align="stretch" spacing={3}>
      <Box>
        <FormControl isInvalid={Boolean(error)}>
          <Input
            aria-label="Pickup date"
            type="date"
            value={toInputValue(pickupISO)}
            onChange={(e) => {
              const nextPickup = e.target.value || null
              // If pickup moves beyond return, keep return as-is (user can adjust) for clarity.
              onChange({ pickupISO: nextPickup, returnISO })
            }}
          />
          <FormErrorMessage mt={1}>{error}</FormErrorMessage>
        </FormControl>
      </Box>

      <Box>
        <Input
          aria-label="Return date"
          type="date"
          min={pickupISO ?? undefined}
          value={toInputValue(returnISO)}
          onChange={(e) => {
            const nextReturn = e.target.value || null
            onChange({ pickupISO, returnISO: nextReturn })
          }}
        />
      </Box>
    </VStack>
  )
}

