import { HStack, Icon, Text } from '@chakra-ui/react'
import * as React from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'

export default function RatingStars({ rating, reviewCount }: { rating: number; reviewCount: number }) {
  const stars = Array.from({ length: 5 }).map((_, i) => i + 1)
  const filled = Math.round(rating * 2) / 2

  return (
    <HStack spacing={1} align="center">
      {stars.map((s) => (
        <Icon
          key={s}
          as={s <= filled ? AiFillStar : AiOutlineStar}
          color={s <= filled ? 'orange.400' : 'blackAlpha.300'}
          boxSize={4}
          aria-hidden="true"
        />
      ))}
      <Text fontSize="sm" color="gray.600">
        {rating.toFixed(1)} ({reviewCount})
      </Text>
    </HStack>
  )
}

