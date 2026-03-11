import React from 'react'
import CartWidget from '../CartWidget/CartWidget'
import {
  Flex,
  Image,
  Text,
  Link as ChakraLink,
  IconButton,
  useColorMode,
  useColorModeValue,
  Box,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { MdLightMode, MdDarkMode } from 'react-icons/md'

const NavBar = ({ title }) => {
  const { toggleColorMode, colorMode } = useColorMode()

  const navBg = useColorModeValue(
    'rgba(244, 243, 239, 0.88)',
    'rgba(10, 10, 16, 0.88)'
  )
  const borderColor = useColorModeValue(
    'rgba(255,82,0,0.3)',
    'rgba(255,82,0,0.25)'
  )

  return (
    <Flex
      as="nav"
      h="68px"
      w="100%"
      position="sticky"
      top={0}
      zIndex={200}
      align="center"
      justify="space-between"
      px={{ base: 3, md: 6 }}
      bg={navBg}
      borderBottom={`1px solid ${borderColor}`}
      backdropFilter="blur(14px)"
      style={{ WebkitBackdropFilter: 'blur(14px)' }}
    >
      {/* Logo */}
      <ChakraLink as={Link} to="/" _hover={{ opacity: 0.85 }} flexShrink={0}>
        <Image
          src="../Img/logo.png"
          alt="BasketDrip Logo"
          h="44px"
          w="auto"
          objectFit="contain"
          // En modo oscuro: invert para pasar de negro a blanco,
          // luego sepia+saturate+hue-rotate para teñirlo de naranja
          filter={
            colorMode === 'dark'
              ? 'invert(1) sepia(1) saturate(3) hue-rotate(345deg) brightness(1.1)'
              : 'none'
          }
          transition="filter 0.3s ease"
        />
      </ChakraLink>

      {/* Brand Name */}
      <ChakraLink
        as={Link}
        to="/"
        _hover={{ textDecoration: 'none', opacity: 0.9 }}
        position="absolute"
        left="50%"
        transform="translateX(-50%)"
      >
        <Text
          fontFamily="'Bebas Neue', sans-serif"
          fontSize={{ base: '28px', sm: '34px', md: '40px' }}
          letterSpacing="0.06em"
          lineHeight="1"
          bgGradient="linear(135deg, #FF5200, #FF9A3D)"
          bgClip="text"
          style={{ WebkitTextFillColor: 'transparent' }}
          userSelect="none"
        >
          {title}
        </Text>
      </ChakraLink>

      {/* Right controls */}
      <Flex align="center" gap={1}>
        <IconButton
          aria-label="Toggle color mode"
          icon={colorMode === 'dark' ? <MdLightMode size={20} /> : <MdDarkMode size={20} />}
          onClick={toggleColorMode}
          variant="ghost"
          size="sm"
          color={colorMode === 'dark' ? '#FFB380' : '#CC4200'}
          _hover={{
            bg: 'rgba(255,82,0,0.12)',
            color: '#FF5200',
            transform: 'rotate(20deg)',
          }}
          transition="all 0.25s ease"
        />
        <CartWidget />
      </Flex>
    </Flex>
  )
}

export default NavBar