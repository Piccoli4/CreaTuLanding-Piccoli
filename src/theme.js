import { extendTheme } from '@chakra-ui/react'

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const colors = {
  brand: {
    orange: '#FF5200',
    orangeLight: '#FF7A3D',
    orangeDark: '#CC4200',
    orangeGlow: 'rgba(255,82,0,0.15)',
    black: '#0A0A10',
    darkCard: '#13131C',
    darkSurface: '#1C1C28',
    darkBorder: 'rgba(255,82,0,0.2)',
    lightBg: '#F4F3EF',
    lightCard: '#FFFFFF',
    lightSurface: '#EDECEA',
    lightBorder: 'rgba(255,82,0,0.25)',
    textDark: '#EAE9F0',
    textMuted: '#7A7A99',
    textLight: '#1A1A26',
  },
}

const fonts = {
  heading: "'Bebas Neue', 'Permanent Marker', sans-serif",
  body: "'Outfit', 'Montserrat', sans-serif",
}

const components = {
  Button: {
    baseStyle: {
      fontFamily: "'Outfit', sans-serif",
      fontWeight: '600',
      letterSpacing: '0.03em',
      borderRadius: '4px',
      transition: 'all 0.2s ease',
    },
    variants: {
      brand: {
        bg: 'brand.orange',
        color: 'white',
        _hover: { bg: 'brand.orangeLight', transform: 'translateY(-1px)', boxShadow: '0 4px 20px rgba(255,82,0,0.4)' },
        _active: { bg: 'brand.orangeDark', transform: 'scale(0.97)' },
      },
      ghost: {
        _hover: { bg: 'brand.orangeGlow', color: 'brand.orange' },
      },
    },
    defaultProps: { variant: 'brand' },
  },
  Input: {
    variants: {
      outline: (props) => ({
        field: {
          borderColor: props.colorMode === 'dark' ? 'brand.darkBorder' : 'brand.lightBorder',
          bg: props.colorMode === 'dark' ? 'brand.darkSurface' : 'white',
          color: props.colorMode === 'dark' ? 'brand.textDark' : 'brand.textLight',
          _focus: { borderColor: 'brand.orange', boxShadow: '0 0 0 1px #FF5200' },
          _hover: { borderColor: 'brand.orange' },
        },
      }),
    },
    defaultProps: { variant: 'outline' },
  },
  FormLabel: {
    baseStyle: (props) => ({
      fontFamily: "'Outfit', sans-serif",
      fontWeight: '500',
      fontSize: '13px',
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: props.colorMode === 'dark' ? 'brand.textMuted' : '#555',
    }),
  },
}

const styles = {
  global: (props) => ({
    'html, body': {
      bg: props.colorMode === 'dark' ? 'brand.black' : 'brand.lightBg',
      color: props.colorMode === 'dark' ? 'brand.textDark' : 'brand.textLight',
      transition: 'background-color 0.3s ease, color 0.3s ease',
      fontFamily: "'Outfit', sans-serif",
    },
    '*': {
      boxSizing: 'border-box',
    },
    '::selection': {
      bg: 'brand.orange',
      color: 'white',
    },
    '::-webkit-scrollbar': {
      width: '6px',
    },
    '::-webkit-scrollbar-track': {
      bg: props.colorMode === 'dark' ? 'brand.black' : 'brand.lightBg',
    },
    '::-webkit-scrollbar-thumb': {
      bg: 'brand.orange',
      borderRadius: '3px',
    },
  }),
}

const theme = extendTheme({ config, colors, fonts, components, styles })

export default theme
