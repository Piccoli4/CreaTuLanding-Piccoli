import React, { useEffect, useState } from 'react'
import { Box, Button, Flex, Text } from '@chakra-ui/react'
import { useColorModeValue } from '@chakra-ui/react'

const ItemCount = ({ valorInicial, onAdd, stock, isDisabled, resetCount }) => {
  const [count, setCount] = useState(valorInicial)

  useEffect(() => {
    setCount(valorInicial)
  }, [resetCount])

  const bgBtn = '#FF5200'
  const textMuted = useColorModeValue('#888', '#666')

  const incrementar = () => {
    if (count < stock) setCount(count + 1)
  }

  const decrementar = () => {
    if (count > valorInicial) setCount(count - 1)
  }

  return (
    <Flex direction="column" gap={4} w="100%">
      {/* Counter */}
      <Flex align="center" gap={4}>
        <Button
          onClick={decrementar}
          isDisabled={isDisabled || count <= valorInicial}
          w="36px"
          h="36px"
          minW="36px"
          bg="transparent"
          border="1px solid rgba(255,82,0,0.4)"
          color="#FF5200"
          borderRadius="6px"
          fontSize="18px"
          fontWeight="700"
          p={0}
          _hover={{ bg: 'rgba(255,82,0,0.1)', borderColor: '#FF5200' }}
          _active={{ transform: 'scale(0.93)' }}
          _disabled={{ opacity: 0.35, cursor: 'not-allowed' }}
        >
          −
        </Button>

        <Box textAlign="center" minW="60px">
          <Text
            fontFamily="'Bebas Neue', sans-serif"
            fontSize="28px"
            letterSpacing="0.04em"
            lineHeight="1"
          >
            {count}
          </Text>
          <Text
            fontSize="10px"
            fontWeight="600"
            letterSpacing="0.1em"
            textTransform="uppercase"
            color={textMuted}
          >
            {count === 1 ? 'par' : 'pares'}
          </Text>
        </Box>

        <Button
          onClick={incrementar}
          isDisabled={isDisabled || count >= stock}
          w="36px"
          h="36px"
          minW="36px"
          bg="transparent"
          border="1px solid rgba(255,82,0,0.4)"
          color="#FF5200"
          borderRadius="6px"
          fontSize="18px"
          fontWeight="700"
          p={0}
          _hover={{ bg: 'rgba(255,82,0,0.1)', borderColor: '#FF5200' }}
          _active={{ transform: 'scale(0.93)' }}
          _disabled={{ opacity: 0.35, cursor: 'not-allowed' }}
        >
          +
        </Button>
      </Flex>

      {/* Add to cart button */}
      <Button
        onClick={() => onAdd(count)}
        isDisabled={isDisabled}
        w="100%"
        h="44px"
        bg={bgBtn}
        color="white"
        fontFamily="'Outfit', sans-serif"
        fontWeight="700"
        fontSize="13px"
        letterSpacing="0.1em"
        textTransform="uppercase"
        borderRadius="6px"
        boxShadow="0 4px 16px rgba(255,82,0,0.3)"
        _hover={{ bg: '#FF7A3D', boxShadow: '0 6px 24px rgba(255,82,0,0.45)', transform: 'translateY(-1px)' }}
        _active={{ bg: '#CC4200', transform: 'scale(0.97)' }}
        _disabled={{ opacity: 0.4, cursor: 'not-allowed', transform: 'none', boxShadow: 'none' }}
        transition="all 0.2s ease"
      >
        Agregar al carrito
      </Button>
    </Flex>
  )
}

export default ItemCount
