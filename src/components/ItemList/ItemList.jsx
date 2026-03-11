import React, { useRef } from 'react'
import { Grid, Box } from '@chakra-ui/react'
import { motion, useInView } from 'framer-motion'
import Item, { cardVariant } from '../Item/Item'

const MotionGrid = motion(Grid)

// Variante del contenedor: orquesta el stagger de los hijos
const gridVariant = {
  hidden: {},
  visible: {
    transition: {
      // Cada card espera 0.07s después de la anterior
      staggerChildren: 0.07,
      // Pequeño delay inicial para que el layout ya esté estable
      delayChildren: 0.05,
    },
  },
}

const ItemList = ({ productos }) => {
  const ref = useRef(null)

  // Se dispara cuando el 15% del grid entra al viewport
  // once: false → se re-anima si el usuario vuelve a scrollear hacia arriba
  const inView = useInView(ref, { amount: 0.08, once: false })

  return (
    <Box ref={ref} p={{ base: 4, md: 6 }}>
      <MotionGrid
        // key basado en productos para re-triggerear el stagger al cambiar de filtro de marca
        key={productos.map((p) => p.id).join('-')}
        variants={gridVariant}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        templateColumns={{
          base: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
          xl: 'repeat(5, 1fr)',
        }}
        gap={5}
      >
        {productos.map((prod) => (
          <Item key={prod.id} {...prod} />
        ))}
      </MotionGrid>
    </Box>
  )
}

export default ItemList
