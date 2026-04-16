'use client'

import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const theme = extendTheme({
  config,
  styles: {
    global: {
      'html, body': {
        background:
          'radial-gradient(1200px 600px at 20% -10%, rgba(13, 148, 136, 0.20), rgba(255,255,255,0) 60%), radial-gradient(900px 520px at 90% 0%, rgba(21, 128, 61, 0.14), rgba(255,255,255,0) 55%), #f7fafc',
        color: 'gray.800',
      },
    },
  },
  colors: {
    brand: {
      500: '#14b8a6',
    },
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: '14px',
      },
      variants: {
        solid: {
          bg: 'brand.500',
          _hover: { bg: 'brand.500' },
        },
      },
    },
  },
})

export default theme