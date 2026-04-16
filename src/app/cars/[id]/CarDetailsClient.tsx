'use client'

import * as React from 'react'
import type { Car } from '@/lib/types'
import { formatCurrency } from '@/lib/format'
import { getDateRangeDays, isDateRangeValid } from '@/lib/date'
import { getAvailabilityBadgeLabel, isCarAvailableForDates } from '@/lib/availability'
import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  VStack,
  Text,
  useToast
} from '@chakra-ui/react'
import CarGallery from '@/components/CarGallery'
import DateRangePicker from '@/components/filters/DateRangePicker'
import RatingStars from '@/components/RatingStars'
import { format, addDays } from 'date-fns'
import Link from 'next/link'

function toISODateInput(d: Date) {
  return format(d, 'yyyy-MM-dd')
}

export default function CarDetailsClient({ car }: { car: Car }) {
  const toast = useToast()

  const today = React.useMemo(() => new Date(), [])
  const [pickupISO, setPickupISO] = React.useState<string>(() => toISODateInput(today))
  const [returnISO, setReturnISO] = React.useState<string>(() => toISODateInput(addDays(today, 3)))

  const days = React.useMemo(() => {
    if (!pickupISO || !returnISO) return null
    if (!isDateRangeValid(pickupISO, returnISO)) return null
    return getDateRangeDays(pickupISO, returnISO)
  }, [pickupISO, returnISO])

  const total = days ? days * car.pricePerDay : null
  const available = isCarAvailableForDates(car, pickupISO, returnISO)
  const badgeLabel = getAvailabilityBadgeLabel(car, pickupISO, returnISO)

  return (
    <Container maxW="container.xl" px={{ base: 4, md: 8 }} py={8}>
      <Flex align="center" justify="space-between" mb={4}>
        <Link href="/" style={{ textDecoration: 'none' }} aria-label="Back to listings">
          <Text color="brand.500" fontWeight={700}>
            Back to listings
          </Text>
        </Link>
        <Badge
          colorScheme={available ? 'teal' : badgeLabel === 'Limited' ? 'yellow' : 'gray'}
          borderRadius="999px"
          px={3}
          py={1}
        >
          {badgeLabel}
        </Badge>
      </Flex>

      <Box position="relative" borderRadius="22px" overflow="hidden">
        <CarGallery images={car.images} name={car.name} />
        <Box
          position="absolute"
          left={0}
          right={0}
          bottom={0}
          p={{ base: 4, md: 6 }}
          background="linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.65) 100%)"
        >
          <Heading color="white" fontSize={{ base: '2xl', md: '3xl' }} letterSpacing="-0.03em">
            {car.name}
          </Heading>
          <Text mt={2} color="whiteAlpha.900">
            {car.location} · {car.type}
          </Text>
          <Box mt={3}>
            <RatingStars rating={car.rating} reviewCount={car.reviewCount} />
          </Box>
          <Text mt={3} color="white" fontWeight={700} fontSize="lg">
            {formatCurrency(car.pricePerDay)} / day
          </Text>
        </Box>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} mt={10} alignItems="start">
        <Box>
          <Heading size="md" mb={4}>
            Specs
          </Heading>
          <SimpleGrid columns={{ base: 2, sm: 3 }} spacing={4}>
            <Box bg="white" borderRadius="18px" boxShadow="0 12px 30px rgba(0,0,0,0.03)" p={4}>
              <Text fontSize="xs" color="gray.500">
                Seats
              </Text>
              <Text fontSize="xl" fontWeight={800}>
                {car.specs.seats}
              </Text>
            </Box>
            <Box bg="white" borderRadius="18px" boxShadow="0 12px 30px rgba(0,0,0,0.03)" p={4}>
              <Text fontSize="xs" color="gray.500">
                Transmission
              </Text>
              <Text fontSize="xl" fontWeight={800}>
                {car.specs.transmission}
              </Text>
            </Box>
            <Box bg="white" borderRadius="18px" boxShadow="0 12px 30px rgba(0,0,0,0.03)" p={4}>
              <Text fontSize="xs" color="gray.500">
                Fuel
              </Text>
              <Text fontSize="xl" fontWeight={800}>
                {car.specs.fuelType}
              </Text>
            </Box>
          </SimpleGrid>

          <Box mt={8}>
            <Heading size="md" mb={3}>
              What you get
            </Heading>
            <VStack spacing={2}>
              <Text color="gray.600">Pickup-ready vehicle with handover support.</Text>
              <Text color="gray.600">Secure payment and flexible adjustments.</Text>
              <Text color="gray.600">Real availability check for your chosen dates.</Text>
            </VStack>
          </Box>
        </Box>

        <Box bg="white" borderRadius="22px" boxShadow="0 20px 60px rgba(0,0,0,0.06)" p={{ base: 5, md: 6 }} position="sticky" top="92px">
          <Heading size="md" mb={4}>
            Book this car
          </Heading>

          <DateRangePicker
            pickupISO={pickupISO}
            returnISO={returnISO}
            onChange={(next) => {
              setPickupISO(next.pickupISO ?? pickupISO)
              setReturnISO(next.returnISO ?? returnISO)
            }}
          />

          <Box mt={6}>
            <HStack justify="space-between">
              <Text color="gray.600">Price</Text>
              <Text fontWeight={800}>{formatCurrency(car.pricePerDay)} / day</Text>
            </HStack>
            <HStack justify="space-between" mt={2}>
              <Text color="gray.600">Total estimate</Text>
              <Text fontWeight={900} fontSize="xl">
                {total ? formatCurrency(total) : '—'}
              </Text>
            </HStack>
            {days ? (
              <Text mt={1} color="gray.500" fontSize="sm">
                Estimated for {days} day{days === 1 ? '' : 's'}
              </Text>
            ) : (
              <Text mt={1} color="gray.500" fontSize="sm">
                Choose a valid pickup and return date.
              </Text>
            )}
          </Box>

          <Button
            mt={6}
            width="100%"
            size="lg"
            borderRadius="16px"
            isDisabled={!days || !available}
            onClick={() => {
              if (!days || !available) return
              toast({
                title: 'Booking request sent',
                description: `${car.name} · ${days} days · ${formatCurrency(total ?? 0)}`,
                status: 'success',
                duration: 3500,
                isClosable: true
              })
            }}
          >
            Book now
          </Button>

          {!available && days ? (
            <Text mt={3} color="red.500" fontSize="sm" fontWeight={600}>
              This car isn’t available for your selected dates.
            </Text>
          ) : null}
        </Box>
      </SimpleGrid>
    </Container>
  )
}

