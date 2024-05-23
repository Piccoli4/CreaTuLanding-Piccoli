import { Box, Image, Text, Divider, ButtonGroup, Button } from '@chakra-ui/react'
import React from 'react'

const Item = ({ marca, modelo, precio, img }) => {
  return (
    <Box 
      border="1px solid #E0E0E0"
      borderRadius="10px"
      p={3}
      transition="transform 0.3s, box-shadow 0.3s"
      _hover={{ transform: "translateY(-5px)", boxShadow: "lg", cursor: "Pointer" }}
      textAlign="center"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Image 
        src={img} 
        alt={`${marca} ${modelo}`} 
        borderRadius="md" 
        mb={4}
        objectFit="contain"
        boxSize="260px"
      />
      <Text fontFamily="Montserrat, sans-serif" fontWeight="600">
        {marca}
      </Text>
      <Text fontFamily="Montserrat, sans-serif" fontWeight="500" color="gray.500">
        {modelo}
      </Text>
      <Text fontFamily="Montserrat, sans-serif" fontWeight="bold" fontSize={"18px"} color="primary" mt={2}>
        ${precio}
      </Text>
      <Divider />
      <ButtonGroup spacing="2" mt={3}>
        <Button size="sm" bg="#FF6F00" color="white" _hover={{ bg: "#E65C00", boxShadow: "2px 2px 6px #aaa" }} _active={{transform: "scale(.9)"}}>
          Comprar
        </Button>
        <Button size="sm" variant="ghost" colorScheme='orange' _active={{transform: "scale(.9)"}}>
          Agregar al Carrito
        </Button>
      </ButtonGroup>
    </Box>
  )
}

export default Item;
