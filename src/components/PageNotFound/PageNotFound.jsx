import React from 'react'
import { Box, Button, Flex, Text, useColorModeValue } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  const pageBg = useColorModeValue('#F4F3EF', '#0A0A10')
  const textMuted = useColorModeValue('#999', '#555')

  return (
    <Flex
      bg={pageBg}
      minH="calc(100vh - 68px)"
      justify="center"
      align="center"
      direction="column"
      textAlign="center"
      px={6}
      gap={4}
      className="court-pattern"
    >
      {/* Giant 404 */}
      <Box position="relative">
        <Text
          fontFamily="'Bebas Neue', sans-serif"
          fontSize={{ base: '120px', md: '200px' }}
          lineHeight="1"
          letterSpacing="0.02em"
          color="transparent"
          style={{
            WebkitTextStroke: '2px rgba(255,82,0,0.25)',
          }}
          userSelect="none"
        >
          404
        </Text>
        {/* Centered basketball emoji */}
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          fontSize={{ base: '52px', md: '80px' }}
          style={{
            animation: 'bounce 1.2s ease-in-out infinite',
          }}
        >
          🏀
        </Box>
      </Box>

      <Box maxW="380px">
        <Text
          fontFamily="'Bebas Neue', sans-serif"
          fontSize={{ base: '22px', md: '28px' }}
          letterSpacing="0.06em"
          mb={2}
        >
          Fuera de cancha
        </Text>
        <Text fontSize="14px" color={textMuted} fontWeight="400" lineHeight="1.6">
          Esta página no existe o fue eliminada. Volvé al inicio y encontrá las mejores zapatillas.
        </Text>
      </Box>

      <Link to="/">
        <Button
          mt={2}
          h="46px"
          px={10}
          bg="#FF5200"
          color="white"
          fontFamily="'Outfit', sans-serif"
          fontWeight="700"
          fontSize="13px"
          letterSpacing="0.1em"
          textTransform="uppercase"
          borderRadius="6px"
          boxShadow="0 4px 20px rgba(255,82,0,0.35)"
          _hover={{ bg: '#FF7A3D', transform: 'translateY(-2px)', boxShadow: '0 8px 28px rgba(255,82,0,0.45)' }}
          _active={{ bg: '#CC4200', transform: 'scale(0.97)' }}
          transition="all 0.2s ease"
        >
          Volver al inicio
        </Button>
      </Link>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translate(-50%, -50%) translateY(0); }
          50% { transform: translate(-50%, -50%) translateY(-18px); }
        }
      `}</style>
    </Flex>
  )
}

export default PageNotFound
