import React, { useRef } from 'react'
import { Box, Flex, Text, Button, useColorMode } from '@chakra-ui/react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'

// ─── Motion wrappers ──────────────────────────────────────────────────────────
const MotionBox = motion(Box)

// ─── Líneas de cancha SVG ─────────────────────────────────────────────────────
const CourtLines = ({ isDark }) => {
  const s1 = isDark ? 'rgba(255,82,0,0.10)' : 'rgba(255,82,0,0.08)'
  const s2 = isDark ? 'rgba(255,82,0,0.16)' : 'rgba(255,82,0,0.12)'
  return (
    <Box
      position="absolute"
      top={0} left={0} right={0} bottom={0}
      overflow="hidden"
      pointerEvents="none"
      zIndex={1}
    >
      <svg width="100%" height="100%" viewBox="0 0 1200 600"
        preserveAspectRatio="xMidYMid slice" fill="none">
        <line x1="600" y1="0" x2="600" y2="600" stroke={s1} strokeWidth="1.5" />
        <circle cx="600" cy="300" r="120" stroke={s2} strokeWidth="1.5" fill="none" />
        <path d="M 0 180 Q 260 300 0 420" stroke={s1} strokeWidth="1.5" fill="none" />
        <path d="M 1200 180 Q 940 300 1200 420" stroke={s1} strokeWidth="1.5" fill="none" />
        <rect x="0" y="180" width="200" height="240" stroke={s1} strokeWidth="1" fill="none" />
        <rect x="1000" y="180" width="200" height="240" stroke={s1} strokeWidth="1" fill="none" />
        <path d="M 0 60 Q 420 300 0 540" stroke={s1} strokeWidth="1" fill="none" strokeDasharray="6 4" />
        <path d="M 1200 60 Q 780 300 1200 540" stroke={s1} strokeWidth="1" fill="none" strokeDasharray="6 4" />
      </svg>
    </Box>
  )
}

// ─── Balón flotante ────────────────────────────────────────────────────────────
const FloatingBall = () => (
  <MotionBox
    position="absolute"
    right={{ base: '-60px', sm: '-20px', md: '5%', lg: '9%' }}
    top="50%"
    zIndex={2}
    animate={{ y: [0, -24, 0], rotate: [0, 16, 0] }}
    transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
    style={{ translateY: '-50%' }}
  >
    <svg
      width="clamp(160px, 26vw, 380px)"
      height="clamp(160px, 26vw, 380px)"
      viewBox="0 0 200 200"
      fill="none"
    >
      <defs>
        <radialGradient id="bg" cx="38%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#FF8C4A" />
          <stop offset="60%" stopColor="#FF5200" />
          <stop offset="100%" stopColor="#8B2600" />
        </radialGradient>
        <radialGradient id="shine" cx="32%" cy="28%" r="38%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.22)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="96" fill="url(#bg)" />
      <circle cx="100" cy="100" r="96" fill="url(#shine)" />
      <path d="M 4 100 Q 100 40 196 100" stroke="#6B1A00" strokeWidth="2.5" fill="none" opacity="0.6" />
      <path d="M 4 100 Q 100 160 196 100" stroke="#6B1A00" strokeWidth="2.5" fill="none" opacity="0.6" />
      <line x1="100" y1="4" x2="100" y2="196" stroke="#6B1A00" strokeWidth="2.5" opacity="0.6" />
      <path d="M 100 4 Q 42 100 100 196" stroke="#6B1A00" strokeWidth="1.8" fill="none" opacity="0.45" />
      <path d="M 100 4 Q 158 100 100 196" stroke="#6B1A00" strokeWidth="1.8" fill="none" opacity="0.45" />
      <circle cx="100" cy="100" r="96" stroke="rgba(0,0,0,0.2)" strokeWidth="2" fill="none" />
    </svg>

    {/* Sombra sincronizada */}
    <MotionBox
      position="absolute"
      bottom="-14px"
      left="50%"
      style={{ translateX: '-50%' }}
      w="55%"
      h="12px"
      borderRadius="50%"
      bg="rgba(0,0,0,0.28)"
      filter="blur(7px)"
      animate={{ scaleX: [1, 0.72, 1], opacity: [0.28, 0.48, 0.28] }}
      transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
    />
  </MotionBox>
)

// ─── Palabra DRIP de fondo ─────────────────────────────────────────────────────
const BackgroundWord = ({ isDark }) => (
  <Box
    position="absolute"
    bottom="-30px"
    left="-12px"
    zIndex={1}
    pointerEvents="none"
    userSelect="none"
  >
    <Text
      fontFamily="'Bebas Neue', sans-serif"
      fontSize={{ base: '130px', md: '210px', lg: '270px' }}
      lineHeight="0.85"
      letterSpacing="-0.02em"
      color="transparent"
      style={{
        WebkitTextStroke: isDark
          ? '1.5px rgba(255,82,0,0.07)'
          : '1.5px rgba(255,82,0,0.06)',
      }}
    >
      DRIP
    </Text>
  </Box>
)

// ─── Chip de stat ──────────────────────────────────────────────────────────────
const StatChip = ({ value, label, delay, isDark }) => (
  <MotionBox
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
    bg={isDark ? 'rgba(255,82,0,0.07)' : 'rgba(255,82,0,0.06)'}
    border={`1px solid ${isDark ? 'rgba(255,82,0,0.22)' : 'rgba(255,82,0,0.18)'}`}
    borderRadius="8px"
    px={4}
    py={2}
    textAlign="center"
    flexShrink={0}
  >
    <Text
      fontFamily="'Bebas Neue', sans-serif"
      fontSize={{ base: '20px', md: '26px' }}
      color="#FF5200"
      lineHeight="1"
      letterSpacing="0.04em"
    >
      {value}
    </Text>
    <Text
      fontFamily="'Outfit', sans-serif"
      fontSize="10px"
      fontWeight="600"
      letterSpacing="0.12em"
      textTransform="uppercase"
      color={isDark ? '#7A7A99' : '#999'}
      mt="2px"
    >
      {label}
    </Text>
  </MotionBox>
)

// ─── Variantes para el bloque de texto ────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
}

const lineVariants = {
  hidden: { opacity: 0, y: 32, skewY: 1.5 },
  visible: {
    opacity: 1, y: 0, skewY: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

// ─── Componente principal ─────────────────────────────────────────────────────
const HeroSection = () => {
  const { colorMode } = useColorMode()
  const isDark = colorMode === 'dark'
  const ref = useRef(null)

  // Parallax suave — solo en el eje Y, sin tocar opacity (evita conflicto con variants)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, 70])

  const heroBg = isDark
    ? 'linear-gradient(160deg, #0D0D18 0%, #0A0A10 55%, #150A0A 100%)'
    : 'linear-gradient(160deg, #EFEDE7 0%, #F4F3EF 55%, #EDE8E2 100%)'

  const textMain = isDark ? '#EAE9F0' : '#1A1A26'
  const textMuted = isDark ? '#7A7A99' : '#888'
  const btnGhostColor = isDark ? '#EAE9F0' : '#1A1A26'
  const btnGhostBorder = isDark ? 'rgba(255,255,255,0.16)' : 'rgba(0,0,0,0.16)'

  return (
    <Box
      ref={ref}
      position="relative"
      w="100%"
      h={{ base: '92vh', md: '88vh' }}
      maxH="800px"
      minH="500px"
      bg={heroBg}
      overflow="hidden"
    >
      {/* Líneas de cancha */}
      <CourtLines isDark={isDark} />

      {/* Texto gigante de fondo */}
      <BackgroundWord isDark={isDark} />

      {/* Barra naranja top — entra de izquierda a derecha */}
      <MotionBox
        position="absolute"
        top={0} left={0} right={0}
        h="3px"
        bg="linear-gradient(90deg, #FF5200, #FF9A3D, #FF5200)"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: 'left' }}
        zIndex={10}
      />

      {/* Balón flotante */}
      <FloatingBall />

      {/* Bloque de texto con parallax (solo Y, sin opacity) */}
      <motion.div
        style={{
          y: yParallax,
          position: 'relative',
          zIndex: 5,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingLeft: 'clamp(24px, 8vw, 120px)',
          paddingRight: 'clamp(24px, 4vw, 60px)',
          maxWidth: 'min(660px, 58%)',
        }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Eyebrow */}
          <motion.div variants={lineVariants} style={{ marginBottom: '12px' }}>
            <Flex align="center" gap={3}>
              <Box w="26px" h="2px" bg="#FF5200" borderRadius="2px" flexShrink={0} />
              <Text
                fontFamily="'Outfit', sans-serif"
                fontSize="11px"
                fontWeight="700"
                letterSpacing="0.22em"
                textTransform="uppercase"
                color="#FF5200"
              >
                Nueva temporada
              </Text>
            </Flex>
          </motion.div>

          {/* Headline línea 1 */}
          <Box overflow="hidden">
            <motion.div variants={lineVariants}>
              <Text
                fontFamily="'Bebas Neue', sans-serif"
                fontSize={{ base: '68px', sm: '88px', md: '106px', lg: '122px' }}
                lineHeight="0.9"
                letterSpacing="0.01em"
                color={textMain}
              >
                JUGÁ
              </Text>
            </motion.div>
          </Box>

          {/* Headline línea 2 */}
          <Box overflow="hidden" mb={5}>
            <motion.div variants={lineVariants}>
              <Text
                fontFamily="'Bebas Neue', sans-serif"
                fontSize={{ base: '68px', sm: '88px', md: '106px', lg: '122px' }}
                lineHeight="0.9"
                letterSpacing="0.01em"
                bgGradient="linear(90deg, #FF5200, #FF9A3D)"
                bgClip="text"
                style={{ WebkitTextFillColor: 'transparent' }}
              >
                CON ESTILO.
              </Text>
            </motion.div>
          </Box>

          {/* Descripción */}
          <motion.div variants={lineVariants} style={{ marginBottom: '28px', maxWidth: '390px' }}>
            <Text
              fontFamily="'Outfit', sans-serif"
              fontSize={{ base: '14px', md: '15px' }}
              fontWeight="400"
              lineHeight="1.68"
              color={textMuted}
            >
              Las zapatillas que usan los que dominan la cancha.
              Modelos exclusivos de Nike, Adidas, Under Armor y 361°.
            </Text>
          </motion.div>

          {/* CTAs */}
          <motion.div variants={lineVariants} style={{ marginBottom: '36px' }}>
            <Flex gap={3} wrap="wrap">
              <Button
                h="48px"
                px={8}
                bg="#FF5200"
                color="white"
                fontFamily="'Outfit', sans-serif"
                fontWeight="700"
                fontSize="13px"
                letterSpacing="0.1em"
                textTransform="uppercase"
                borderRadius="6px"
                boxShadow="0 4px 24px rgba(255,82,0,0.38)"
                _hover={{
                  bg: '#FF7A3D',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 32px rgba(255,82,0,0.52)',
                }}
                _active={{ bg: '#CC4200', transform: 'scale(0.97)' }}
                transition="all 0.22s ease"
                onClick={() =>
                  document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                Ver colección
              </Button>

              <Link to="/marca/Nike">
                <Button
                  h="48px"
                  px={8}
                  bg="transparent"
                  color={btnGhostColor}
                  fontFamily="'Outfit', sans-serif"
                  fontWeight="600"
                  fontSize="13px"
                  letterSpacing="0.08em"
                  textTransform="uppercase"
                  borderRadius="6px"
                  border={`1px solid ${btnGhostBorder}`}
                  _hover={{
                    borderColor: '#FF5200',
                    color: '#FF5200',
                    bg: 'rgba(255,82,0,0.06)',
                    transform: 'translateY(-2px)',
                  }}
                  _active={{ transform: 'scale(0.97)' }}
                  transition="all 0.22s ease"
                >
                  Nike
                </Button>
              </Link>
            </Flex>
          </motion.div>

          {/* Stats */}
          <motion.div variants={lineVariants}>
            <Flex gap={3} wrap="wrap">
              <StatChip value="200+" label="Modelos" delay={0.75} isDark={isDark} />
              <StatChip value="4" label="Marcas top" delay={0.85} isDark={isDark} />
              <StatChip value="24hs" label="Envío express" delay={0.95} isDark={isDark} />
            </Flex>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Indicador de scroll */}
      <MotionBox
        position="absolute"
        bottom={7}
        left="50%"
        style={{ translateX: '-50%' }}
        zIndex={10}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <Flex direction="column" align="center" gap="4px">
          <Text
            fontFamily="'Outfit', sans-serif"
            fontSize="9px"
            fontWeight="700"
            letterSpacing="0.22em"
            textTransform="uppercase"
            color={isDark ? 'rgba(255,255,255,0.22)' : 'rgba(0,0,0,0.22)'}
          >
            scroll
          </Text>
          <MotionBox
            w="1px"
            h="34px"
            bg="linear-gradient(to bottom, #FF5200, transparent)"
            animate={{ scaleY: [0, 1, 0], y: [0, 5, 0] }}
            transition={{ duration: 1.7, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: 'top' }}
          />
        </Flex>
      </MotionBox>
    </Box>
  )
}

export default HeroSection