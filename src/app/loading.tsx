import { SimpleGrid, Skeleton, SkeletonText } from '@chakra-ui/react'

export default function Loading() {
  return (
    <div style={{ padding: 16 }}>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} spacing={6}>
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i}>
            <Skeleton height="180px" borderRadius="16px" />
            <SkeletonText mt="4" noOfLines={2} spacing="4" />
            <Skeleton mt="4" height="40px" borderRadius="14px" />
          </div>
        ))}
      </SimpleGrid>
    </div>
  )
}

