import React, { useContext, useState } from 'react'
import Context from '../../context/CartContext'
import {
  Button, Flex, FormControl, FormLabel, Input,
  Text, Box, FormErrorMessage, useColorModeValue, Divider
} from '@chakra-ui/react'
import { Timestamp, addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { db } from '../../config/firebase'
import Spinner from '../Spinner/Spinner'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const Checkout = () => {
  const [user, setUser] = useState({ name: '', email: '', repeatedEmail: '', phone: '', direccion: '' })
  const [error, setError] = useState({})
  const [loading, setLoading] = useState(false)

  const { cart, getTotal, clearCart } = useContext(Context)
  const navigate = useNavigate()

  const pageBg = useColorModeValue('#F4F3EF', '#0A0A10')
  const cardBg = useColorModeValue('white', '#13131C')
  const borderColor = useColorModeValue('rgba(0,0,0,0.08)', 'rgba(255,82,0,0.15)')
  const inputBg = useColorModeValue('white', '#1C1C28')
  const inputBorder = useColorModeValue('#CBD5E0', 'rgba(255,82,0,0.2)')
  const textColor = useColorModeValue('#1A1A26', '#EAE9F0')
  const textMuted = useColorModeValue('#888', '#666')

  const updateUser = (event) => {
    if (event.target) {
      setUser((u) => ({ ...u, [event.target.name]: event.target.value }))
    } else {
      setUser((u) => ({ ...u, phone: event }))
    }
  }

  const validateForm = () => {
    const errors = {}
    if (!user.name) errors.name = 'Debés agregar un nombre y apellido.'
    else if (user.name.length < 3) errors.name = 'Su nombre y apellido es muy corto.'
    if (!user.email) errors.email = 'Debés agregar un email.'
    else if (!/\S+@\S+\.\S+/.test(user.email)) errors.email = 'El email ingresado es inválido.'
    else if (/\s/.test(user.email)) errors.email = 'El email no debe contener espacios.'
    if (!user.repeatedEmail) errors.repeatedEmail = 'Debés repetir el email'
    else if (!/\S+@\S+\.\S+/.test(user.repeatedEmail)) errors.repeatedEmail = 'El email ingresado es inválido.'
    else if (user.email !== user.repeatedEmail) errors.repeatedEmail = 'Los emails no coinciden.'
    else if (/\s/.test(user.repeatedEmail)) errors.repeatedEmail = 'El email no debe contener espacios.'
    if (!user.phone) errors.phone = 'Debés agregar un teléfono.'
    else if (!/^\d+$/.test(user.phone)) errors.phone = 'El número de teléfono es inválido.'
    if (!user.direccion) errors.direccion = 'Debés agregar una dirección.'
    setError(errors)
    return Object.keys(errors).length === 0
  }

  const getOrder = async () => {
    if (cart.length === 0) {
      Swal.fire({ title: 'Carrito vacío', text: 'No puedes realizar una compra con el carrito vacío.', icon: 'error', confirmButtonText: 'Ok' })
      return
    }
    if (!validateForm()) return
    setLoading(true)
    const coleccion = collection(db, 'orders')
    let stockIssue = false
    try {
      for (const item of cart) {
        const docRef = doc(db, 'productos', item.id)
        const productDoc = await getDoc(docRef)
        const currentStock = productDoc.data().stock
        if (currentStock >= item.quantity) {
          await updateDoc(docRef, { stock: currentStock - item.quantity })
        } else {
          stockIssue = true
          Swal.fire({ title: 'Stock insuficiente', text: `No hay suficiente stock de ${item.marca} ${item.modelo}`, icon: 'warning', confirmButtonText: 'Ok' })
          break
        }
      }
      if (stockIssue) { setLoading(false); return }
      const order = { buyer: user, cart, total: getTotal(), fecha: Timestamp.now() }
      const orderRef = await addDoc(coleccion, order)
      Swal.fire({
        title: '¡Gracias por tu compra!',
        text: `Tu número de orden es: ${orderRef.id}`,
        icon: 'success',
        confirmButtonText: 'Ir al inicio',
        confirmButtonColor: '#FF5200',
      }).then(() => { clearCart(); navigate('/') })
    } catch (err) {
      console.error('Error processing order: ', err)
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '14px',
    bg: inputBg,
    color: textColor,
    border: `1px solid ${inputBorder}`,
    borderRadius: '6px',
    h: '42px',
    px: 3,
    _focus: { borderColor: '#FF5200', boxShadow: '0 0 0 1px #FF5200' },
    _hover: { borderColor: 'rgba(255,82,0,0.5)' },
  }

  if (loading) {
    return (
      <Flex
        justify="center" align="center"
        h="calc(100vh - 68px)"
        bg={pageBg}
        className="court-pattern"
      >
        <Spinner />
      </Flex>
    )
  }

  return (
    <Flex
      bg={pageBg}
      minH="calc(100vh - 68px)"
      justify="center"
      align="flex-start"
      py={8}
      px={4}
      className="court-pattern"
    >
      <Box
        bg={cardBg}
        border={`1px solid ${borderColor}`}
        borderRadius="12px"
        p={{ base: 5, md: 8 }}
        w="100%"
        maxW="480px"
        boxShadow="0 8px 40px rgba(0,0,0,0.12)"
      >
        {/* Header */}
        <Box mb={6}>
          <Text
            fontFamily="'Bebas Neue', sans-serif"
            fontSize="32px"
            letterSpacing="0.06em"
            lineHeight="1"
          >
            Datos de Facturación
          </Text>
          <Text fontSize="13px" color={textMuted} mt={1}>
            Completá tus datos para finalizar la compra
          </Text>
        </Box>

        <Flex direction="column" gap={4}>
          <FormControl isRequired isInvalid={!!error.name}>
            <FormLabel fontSize="11px" fontWeight="700" letterSpacing="0.1em" textTransform="uppercase" color={textMuted} mb={1}>
              Apellido y Nombre
            </FormLabel>
            <Input
              type="text" name="name"
              onChange={updateUser}
              placeholder="Juan García"
              {...inputStyle}
              textTransform="capitalize"
            />
            <FormErrorMessage fontSize="12px">{error.name}</FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={!!error.email}>
            <FormLabel fontSize="11px" fontWeight="700" letterSpacing="0.1em" textTransform="uppercase" color={textMuted} mb={1}>
              Email
            </FormLabel>
            <Input
              type="email" name="email"
              onChange={updateUser}
              placeholder="ejemplo@correo.com"
              {...inputStyle}
            />
            <FormErrorMessage fontSize="12px">{error.email}</FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={!!error.repeatedEmail}>
            <FormLabel fontSize="11px" fontWeight="700" letterSpacing="0.1em" textTransform="uppercase" color={textMuted} mb={1}>
              Repetir Email
            </FormLabel>
            <Input
              type="email" name="repeatedEmail"
              onChange={updateUser}
              placeholder="ejemplo@correo.com"
              {...inputStyle}
            />
            <FormErrorMessage fontSize="12px">{error.repeatedEmail}</FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={!!error.phone}>
            <FormLabel fontSize="11px" fontWeight="700" letterSpacing="0.1em" textTransform="uppercase" color={textMuted} mb={1}>
              Teléfono
            </FormLabel>
            <Box
              sx={{
                '.react-tel-input .form-control': {
                  width: '100%',
                  height: '42px',
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '14px',
                  background: inputBg,
                  color: textColor,
                  border: `1px solid ${error.phone ? '#FC8181' : inputBorder}`,
                  borderRadius: '6px',
                  transition: 'border-color 0.2s ease',
                },
                '.react-tel-input .form-control:focus': {
                  borderColor: '#FF5200',
                  boxShadow: '0 0 0 1px #FF5200',
                },
                '.react-tel-input .flag-dropdown': {
                  background: inputBg,
                  borderColor: inputBorder,
                  borderRadius: '6px 0 0 6px',
                },
                '.react-tel-input .selected-flag:hover': {
                  background: 'rgba(255,82,0,0.1)',
                },
              }}
            >
              <PhoneInput
                country="ar"
                regions={['south-america']}
                inputProps={{ name: 'phone', required: true }}
                onChange={updateUser}
              />
            </Box>
            <FormErrorMessage fontSize="12px">{error.phone}</FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={!!error.direccion}>
            <FormLabel fontSize="11px" fontWeight="700" letterSpacing="0.1em" textTransform="uppercase" color={textMuted} mb={1}>
              Dirección
            </FormLabel>
            <Input
              type="text" name="direccion"
              onChange={updateUser}
              placeholder="Calle 123, Piso 4"
              {...inputStyle}
            />
            <FormErrorMessage fontSize="12px">{error.direccion}</FormErrorMessage>
          </FormControl>
        </Flex>

        <Divider borderColor={borderColor} my={6} />

        {/* Order summary */}
        <Flex justify="space-between" align="center" mb={5}>
          <Text fontSize="14px" fontWeight="600" textTransform="uppercase" letterSpacing="0.06em">
            Total
          </Text>
          <Text fontFamily="'Bebas Neue', sans-serif" fontSize="28px" color="#FF5200" letterSpacing="0.03em">
            ${getTotal().toLocaleString('es-ES')}
          </Text>
        </Flex>

        <Button
          onClick={getOrder}
          w="100%"
          h="48px"
          bg="#FF5200"
          color="white"
          fontFamily="'Outfit', sans-serif"
          fontWeight="700"
          fontSize="14px"
          letterSpacing="0.1em"
          textTransform="uppercase"
          borderRadius="6px"
          boxShadow="0 4px 20px rgba(255,82,0,0.35)"
          _hover={{ bg: '#FF7A3D', boxShadow: '0 8px 28px rgba(255,82,0,0.5)', transform: 'translateY(-1px)' }}
          _active={{ bg: '#CC4200', transform: 'scale(0.98)' }}
          transition="all 0.2s ease"
        >
          Confirmar compra
        </Button>
      </Box>
    </Flex>
  )
}

export default Checkout
