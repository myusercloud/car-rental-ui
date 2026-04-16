'use client'

import * as React from 'react'
import { Box, Skeleton, SkeletonText } from '@chakra-ui/react'

export default function CarCardSkeleton() {
  return (
    <Box borderRadius="18px" overflow="hidden" boxShadow="0 10px 30px rgba(0,0,0,0.04)" bg="white">
      <Skeleton height="180px" />
      <Box p={5}>
        <SkeletonText mt="4" noOfLines={1} width="85%" spacing="3" />
        <SkeletonText mt="3" noOfLines={1} width="70%" spacing="3" />
        <Skeleton mt="4" height="22px" borderRadius="12px" />
        <Skeleton mt="4" height="44px" borderRadius="14px" />
      </Box>
    </Box>
  )
}

