import { motion, AnimatePresence } from 'framer-motion'
import { pageVariants, pageTransitions } from '../../utils/pageTransitions'

/**
 * PageWrapper — envolvé cada página con este componente
 *
 * Props:
 *   pageType: 'catalog' | 'detail' | 'cart' | 'checkout' | 'notFound'
 *   children: contenido de la página
 *
 * Ejemplo:
 *   <PageWrapper pageType="catalog">
 *     <ItemList ... />
 *   </PageWrapper>
 */
const PageWrapper = ({ children, pageType = 'catalog' }) => {
  const variants = pageVariants[pageType] || pageVariants.catalog
  const transition = pageTransitions[pageType] || pageTransitions.catalog

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      transition={transition}
      style={{ width: '100%', minHeight: 'calc(100vh - 68px)' }}
    >
      {children}
    </motion.div>
  )
}

export default PageWrapper
