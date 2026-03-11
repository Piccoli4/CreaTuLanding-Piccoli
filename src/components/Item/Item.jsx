import React from 'react'
import { Box, Flex, Image, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useColorModeValue } from '@chakra-ui/react'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)

// Variante que el contenedor padre (ItemList) va a orquestar via staggerChildren
export const cardVariant = {
  hidden: {
    opacity: 0,
    y: 44,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 24,
    },
  },
}

const Item = ({ marca, modelo, precio, img, id, outOfStock }) => {
  const cardBg = useColorModeValue('white', '#13131C')
  const cardBorder = useColorModeValue('rgba(0,0,0,0.06)', 'rgba(255,82,0,0.12)')
  const modelColor = useColorModeValue('#555', '#7A7A99')
  const textColor = useColorModeValue('#1A1A26', '#EAE9F0')
  const imgBg = useColorModeValue('rgba(0,0,0,0.03)', 'rgba(255,255,255,0.03)')

  return (
    <MotionBox
      variants={cardVariant}
      bg={cardBg}
      border={`1px solid ${cardBorder}`}
      borderRadius="10px"
      overflow="hidden"
      position="relative"
      h="380px"
      style={{ willChange: 'transform' }}
      whileHover={
        !outOfStock
          ? {
              y: -6,
              boxShadow: '0 16px 40px rgba(255,82,0,0.18)',
              borderColor: 'rgba(255,82,0,0.45)',
              transition: { duration: 0.2 },
            }
          : {}
      }
      role="group"
    >
      {/* Out of stock badge */}
      {outOfStock && (
        <Box
          position="absolute"
          top={3}
          right={3}
          bg="rgba(0,0,0,0.75)"
          color="#FF5200"
          fontSize="10px"
          fontWeight="700"
          letterSpacing="0.1em"
          fontFamily="'Outfit', sans-serif"
          px={2}
          py={1}
          borderRadius="4px"
          textTransform="uppercase"
          zIndex={2}
          border="1px solid rgba(255,82,0,0.3)"
        >
          Agotado
        </Box>
      )}

      {/* Línea naranja en hover */}
      <Box
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        h="3px"
        bg="linear-gradient(90deg, #FF5200, #FF9A3D)"
        transform="scaleX(0)"
        transformOrigin="left"
        transition="transform 0.32s ease"
        _groupHover={!outOfStock ? { transform: 'scaleX(1)' } : {}}
        zIndex={2}
      />

      <Flex direction="column" h="100%" p={4} justify="space-between" align="center">
        {/* Imagen */}
        <Box
          w="100%"
          flex={1}
          overflow="hidden"
          borderRadius="7px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg={imgBg}
        >
          <Image
            src={img}
            alt={`${marca} ${modelo}`}
            maxH="200px"
            maxW="100%"
            objectFit="contain"
            transition="transform 0.38s ease"
            _groupHover={!outOfStock ? { transform: 'scale(1.06)' } : {}}
            filter={outOfStock ? 'grayscale(60%)' : 'none'}
          />
        </Box>

        {/* Info */}
        <Box w="100%" pt={3}>
          <Text
            fontFamily="'Outfit', sans-serif"
            fontWeight="700"
            fontSize="15px"
            color={textColor}
            letterSpacing="0.02em"
            noOfLines={1}
          >
            {marca}
          </Text>
          <Text
            fontFamily="'Outfit', sans-serif"
            fontWeight="400"
            fontSize="13px"
            color={modelColor}
            noOfLines={1}
            mb={2}
          >
            {modelo}
          </Text>

          <Flex justify="space-between" align="center">
            <Text
              fontFamily="'Bebas Neue', sans-serif"
              fontSize="22px"
              color="#FF5200"
              letterSpacing="0.03em"
            >
              ${precio.toLocaleString('es-ES')}
            </Text>

            {!outOfStock && (
              <Link to={`/producto/${id}`}>
                <Box
                  as="span"
                  fontSize="11px"
                  fontWeight="700"
                  fontFamily="'Outfit', sans-serif"
                  letterSpacing="0.1em"
                  textTransform="uppercase"
                  color="#FF5200"
                  border="1px solid rgba(255,82,0,0.4)"
                  px={3}
                  py={1}
                  borderRadius="4px"
                  transition="all 0.2s ease"
                  _hover={{ bg: '#FF5200', color: 'white', borderColor: '#FF5200' }}
                  cursor="pointer"
                >
                  Ver
                </Box>
              </Link>
            )}
          </Flex>
        </Box>
      </Flex>
    </MotionBox>
  )
}

export default Item
