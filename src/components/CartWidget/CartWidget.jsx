import React, { useContext } from 'react';
import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import { BsCart3 } from 'react-icons/bs';
import Context from '../../context/CartContext';
import { Link } from 'react-router-dom';

const CartWidget = () => {
  const { getQuantity } = useContext(Context);
  const qty = getQuantity();

  const iconColor = useColorModeValue('#1A1A26', '#EAE9F0');
  const badgeBg = '#FF5200';

  return (
    <Link to="/cart">
      <Box
        position="relative"
        p={2}
        borderRadius="6px"
        transition="all 0.2s ease"
        _hover={{
          bg: 'rgba(255,82,0,0.1)',
          transform: 'translateY(-1px)',
        }}
        cursor="pointer"
      >
        <BsCart3 size={24} color={iconColor} />

        {qty > 0 && (
          <Flex
            position="absolute"
            top="-2px"
            right="-2px"
            bg={badgeBg}
            color="white"
            borderRadius="full"
            minW="18px"
            h="18px"
            align="center"
            justify="center"
            fontSize="10px"
            fontWeight="700"
            fontFamily="'Outfit', sans-serif"
            boxShadow="0 2px 8px rgba(255,82,0,0.5)"
            transition="all 0.2s ease"
            style={{ transform: qty > 0 ? 'scale(1)' : 'scale(0)' }}
          >
            {qty > 9 ? '9+' : qty}
          </Flex>
        )}
      </Box>
    </Link>
  );
};

export default CartWidget;
