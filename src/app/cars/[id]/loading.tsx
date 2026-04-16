import { Box, Skeleton, SkeletonText } from '@chakra-ui/react'

export default function Loading() {
  return (
    <Box px={4} py={8} maxW="container.xl" mx="auto">
      <Skeleton height="320px" borderRadius="22px" />
      <SkeletonText mt={6} noOfLines={2} spacing="4" />
      <Skeleton height="420px" borderRadius="18px" mt={6} />
    </Box>
  )
}

