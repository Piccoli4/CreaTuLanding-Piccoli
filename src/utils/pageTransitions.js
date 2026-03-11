// Variantes de animación para cada tipo de página
// Usá 'pageType' para elegir la transición adecuada

export const pageVariants = {
  // Lista de productos: entra desde abajo con stagger
  catalog: {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20, scale: 0.98 },
  },

  // Detalle de producto: entra desde la derecha (como ir "dentro" del producto)
  detail: {
    initial: { opacity: 0, x: 60, scale: 0.97 },
    animate: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: -40, scale: 0.97 },
  },

  // Carrito: baja desde arriba (como si "cayera" del ícono del carrito)
  cart: {
    initial: { opacity: 0, y: -50, scale: 0.97 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 30, scale: 0.98 },
  },

  // Checkout: sube desde abajo (sensación de "avanzar")
  checkout: {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30, scale: 0.98 },
  },

  // 404: rebota igual que el balón
  notFound: {
    initial: { opacity: 0, scale: 0.8, rotate: -3 },
    animate: { opacity: 1, scale: 1, rotate: 0 },
    exit: { opacity: 0, scale: 0.9, rotate: 2 },
  },
}

// Configuración de spring/ease para cada tipo
export const pageTransitions = {
  catalog: {
    duration: 0.42,
    ease: [0.25, 0.1, 0.25, 1],
  },
  detail: {
    type: 'spring',
    stiffness: 280,
    damping: 28,
  },
  cart: {
    type: 'spring',
    stiffness: 320,
    damping: 30,
  },
  checkout: {
    duration: 0.38,
    ease: [0.22, 1, 0.36, 1],
  },
  notFound: {
    type: 'spring',
    stiffness: 200,
    damping: 22,
  },
}
