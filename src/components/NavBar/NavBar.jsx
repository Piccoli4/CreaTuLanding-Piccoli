import React from 'react'
import CartWidget from '../CartWidget/CartWidget'
import {
    Flex,
    Image,
    Heading,
    Link as ChakraLink,
    useBreakpointValue
  } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const NavBar = ({title}) => {
  return (
    <Flex h={'12vh'} w={'100%'} justify={'space-between'} align={'center'} backgroundColor={'#FF6F00'}>
      <ChakraLink as={Link} to='/'>
        <Image src="../Img/logo.png" alt="Logo" m={4} w={12} h={16}/>
      </ChakraLink>
      <Flex justify={'center'} align={'center'} >
          <Heading 
              fontFamily={'Permanent Marker'}
              // Ajusta el tamaño del titulo dependiendo el tamaño de la pantalla en la que se ve el ecommerce.
              fontSize={useBreakpointValue({ base: '30px', sm: '40px', md: '50px' })}
              textShadow={'3px 3px 2px #777, 7px 7px 5px #ccc'}
          >
              {title}
          </Heading>
      </Flex>
      <CartWidget/>
    </Flex>
  )
}

export default NavBar
