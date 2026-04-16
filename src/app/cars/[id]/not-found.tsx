import { Box, Button, Heading, Text } from '@chakra-ui/react'
import Link from 'next/link'

export default function CarNotFound() {
  return (
    <Box px={4} py={10} maxW="container.xl" mx="auto">
      <Heading size="md">Car not found</Heading>
      <Text mt={3} color="gray.600">
        The car you’re looking for doesn’t exist in this demo dataset.
      </Text>
      <Button as={Link} href="/" mt={6} variant="solid" borderRadius="16px">
        Back to listings
      </Button>
    </Box>
  )
}

