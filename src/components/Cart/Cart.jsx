import React, { useContext } from 'react'
import {
  Box, Button, Flex, Heading, Image, Text,
  useMediaQuery, useColorModeValue, Divider
} from '@chakra-ui/react'
import Context from '../../context/CartContext'
import { TiDeleteOutline } from 'react-icons/ti'
import { Link } from 'react-router-dom'
import { BsCart3 } from 'react-icons/bs'

const QtyControl = ({ onDecrement, onIncrement, quantity }) => (
  <Flex align="center" gap={2}>
    <Button
      onClick={onDecrement}
      w="28px" h="28px" minW="28px" p={0}
      bg="transparent"
      border="1px solid rgba(255,82,0,0.35)"
      color="#FF5200"
      fontSize="15px" fontWeight="700"
      borderRadius="5px"
      _hover={{ bg: 'rgba(255,82,0,0.1)', borderColor: '#FF5200' }}
      _active={{ transform: 'scale(0.9)' }}
    >−</Button>
    <Text fontFamily="'Bebas Neue', sans-serif" fontSize="20px" minW="24px" textAlign="center">
      {quantity}
    </Text>
    <Button
      onClick={onIncrement}
      w="28px" h="28px" minW="28px" p={0}
      bg="transparent"
      border="1px solid rgba(255,82,0,0.35)"
      color="#FF5200"
      fontSize="15px" fontWeight="700"
      borderRadius="5px"
      _hover={{ bg: 'rgba(255,82,0,0.1)', borderColor: '#FF5200' }}
      _active={{ transform: 'scale(0.9)' }}
    >+</Button>
  </Flex>
)

const Cart = () => {
  const { cart, removeItem, clearCart, getTotal, incrementarItem, decrementarItem } = useContext(Context)
  const [isMobile] = useMediaQuery('(max-width: 768px)')

  const pageBg = useColorModeValue('#F4F3EF', '#0A0A10')
  const cardBg = useColorModeValue('white', '#13131C')
  const borderColor = useColorModeValue('rgba(0,0,0,0.07)', 'rgba(255,82,0,0.12)')
  const textMuted = useColorModeValue('#888', '#666')
  const labelColor = useColorModeValue('#999', '#555')

  if (cart.length === 0) {
    return (
      <Flex
        bg={pageBg}
        minH="calc(100vh - 68px)"
        direction="column"
        justify="center"
        align="center"
        gap={6}
        className="court-pattern"
      >
        <BsCart3 size={64} color={labelColor} />
        <Box textAlign="center">
          <Text
            fontFamily="'Bebas Neue', sans-serif"
            fontSize={{ base: '28px', md: '36px' }}
            letterSpacing="0.05em"
            mb={1}
          >
            Tu carrito está vacío
          </Text>
          <Text fontSize="14px" color={textMuted} fontWeight="400">
            Agregá productos para comenzar
          </Text>
        </Box>
        <Link to="/">
          <Button
            h="44px"
            px={8}
            bg="#FF5200"
            color="white"
            fontFamily="'Outfit', sans-serif"
            fontWeight="700"
            fontSize="13px"
            letterSpacing="0.1em"
            textTransform="uppercase"
            borderRadius="6px"
            boxShadow="0 4px 16px rgba(255,82,0,0.35)"
            _hover={{ bg: '#FF7A3D', transform: 'translateY(-2px)', boxShadow: '0 8px 24px rgba(255,82,0,0.45)' }}
            _active={{ bg: '#CC4200', transform: 'scale(0.97)' }}
            transition="all 0.2s ease"
          >
            Ver productos
          </Button>
        </Link>
      </Flex>
    )
  }

  return (
    <Box bg={pageBg} minH="calc(100vh - 68px)" py={6} px={{ base: 4, md: 8 }} className="court-pattern">
      {/* Header */}
      <Flex align="baseline" gap={3} mb={6}>
        <Text
          fontFamily="'Bebas Neue', sans-serif"
          fontSize={{ base: '28px', md: '38px' }}
          letterSpacing="0.06em"
          lineHeight="1"
        >
          Carrito
        </Text>
        <Text fontSize="13px" color={textMuted} fontWeight="500">
          {cart.length} {cart.length === 1 ? 'producto' : 'productos'}
        </Text>
      </Flex>

      <Flex
        direction={{ base: 'column', lg: 'row' }}
        gap={5}
        align={{ base: 'stretch', lg: 'flex-start' }}
      >
        {/* Cart items */}
        <Box flex={1}>
          <Flex direction="column" gap={3}>
            {cart.map((prod) => (
              <Box
                key={prod.id}
                bg={cardBg}
                border={`1px solid ${borderColor}`}
                borderRadius="10px"
                p={{ base: 3, md: 4 }}
                transition="border-color 0.2s ease"
                _hover={{ borderColor: 'rgba(255,82,0,0.3)' }}
              >
                <Flex gap={4} align="center">
                  {/* Remove */}
                  <Button
                    onClick={() => removeItem(prod.id)}
                    variant="ghost"
                    p={1}
                    h="auto"
                    minW="auto"
                    color="rgba(255,60,60,0.7)"
                    _hover={{ color: '#FF3333', bg: 'rgba(255,0,0,0.07)' }}
                    borderRadius="5px"
                    flexShrink={0}
                  >
                    <TiDeleteOutline size={22} />
                  </Button>

                  {/* Image */}
                  <Box
                    bg={useColorModeValue('rgba(0,0,0,0.03)', 'rgba(255,255,255,0.03)')}
                    borderRadius="7px"
                    p={2}
                    flexShrink={0}
                  >
                    <Image
                      src={prod.img}
                      alt={`${prod.marca} ${prod.modelo}`}
                      objectFit="contain"
                      boxSize={{ base: '70px', md: '90px' }}
                    />
                  </Box>

                  {/* Info */}
                  <Box flex={1} minW={0}>
                    <Text fontWeight="700" fontSize={{ base: '14px', md: '16px' }} noOfLines={1}>
                      {prod.marca}
                    </Text>
                    <Text fontWeight="400" fontSize="13px" color={textMuted} noOfLines={1}>
                      {prod.modelo}
                    </Text>
                    <Text fontSize="12px" color={labelColor} mt={0.5}>
                      Talle {prod.talle}
                    </Text>
                  </Box>

                  {/* Right: qty + price */}
                  <Flex
                    direction="column"
                    align="flex-end"
                    gap={2}
                    flexShrink={0}
                  >
                    <Text
                      fontFamily="'Bebas Neue', sans-serif"
                      fontSize="20px"
                      color="#FF5200"
                      letterSpacing="0.03em"
                    >
                      ${(prod.precio * prod.quantity).toLocaleString('es-ES')}
                    </Text>
                    <QtyControl
                      quantity={prod.quantity}
                      onDecrement={() => decrementarItem(prod.id)}
                      onIncrement={() => incrementarItem(prod.id, prod.stock)}
                    />
                    <Text fontSize="11px" color={labelColor}>
                      ${prod.precio.toLocaleString('es-ES')} c/u
                    </Text>
                  </Flex>
                </Flex>
              </Box>
            ))}
          </Flex>

          {/* Clear cart */}
          <Flex justify="flex-start" mt={4}>
            <Button
              onClick={clearCart}
              variant="ghost"
              fontSize="12px"
              fontWeight="600"
              letterSpacing="0.08em"
              textTransform="uppercase"
              color={textMuted}
              h="36px"
              px={4}
              borderRadius="5px"
              border={`1px solid ${borderColor}`}
              _hover={{ color: '#FF3333', borderColor: 'rgba(255,0,0,0.3)', bg: 'rgba(255,0,0,0.05)' }}
            >
              Vaciar carrito
            </Button>
          </Flex>
        </Box>

        {/* Summary */}
        <Box
          w={{ base: '100%', lg: '320px' }}
          bg={cardBg}
          border={`1px solid ${borderColor}`}
          borderRadius="10px"
          p={5}
          position={{ base: 'static', lg: 'sticky' }}
          top="100px"
        >
          <Text
            fontFamily="'Bebas Neue', sans-serif"
            fontSize="22px"
            letterSpacing="0.06em"
            mb={4}
          >
            Resumen
          </Text>

          <Flex direction="column" gap={2} mb={4}>
            {cart.map((prod) => (
              <Flex key={prod.id} justify="space-between" align="center">
                <Text fontSize="13px" color={textMuted} noOfLines={1} flex={1} mr={2}>
                  {prod.marca} {prod.modelo} x{prod.quantity}
                </Text>
                <Text fontSize="13px" fontWeight="600" flexShrink={0}>
                  ${(prod.precio * prod.quantity).toLocaleString('es-ES')}
                </Text>
              </Flex>
            ))}
          </Flex>

          <Divider borderColor={borderColor} mb={4} />

          <Flex justify="space-between" align="center" mb={5}>
            <Text fontWeight="700" fontSize="14px" textTransform="uppercase" letterSpacing="0.06em">
              Total
            </Text>
            <Text
              fontFamily="'Bebas Neue', sans-serif"
              fontSize="28px"
              color="#FF5200"
              letterSpacing="0.03em"
            >
              ${getTotal().toLocaleString('es-ES')}
            </Text>
          </Flex>

          <Link to="/checkout">
            <Button
              w="100%"
              h="46px"
              bg="#FF5200"
              color="white"
              fontFamily="'Outfit', sans-serif"
              fontWeight="700"
              fontSize="13px"
              letterSpacing="0.1em"
              textTransform="uppercase"
              borderRadius="6px"
              boxShadow="0 4px 16px rgba(255,82,0,0.3)"
              _hover={{ bg: '#FF7A3D', boxShadow: '0 8px 24px rgba(255,82,0,0.45)', transform: 'translateY(-1px)' }}
              _active={{ bg: '#CC4200', transform: 'scale(0.97)' }}
              transition="all 0.2s ease"
            >
              Finalizar compra
            </Button>
          </Link>
        </Box>
      </Flex>
    </Box>
  )
}

export default Cart
