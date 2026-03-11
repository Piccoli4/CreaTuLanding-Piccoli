import React, { useEffect, useState } from 'react'
import {
  Box, Flex, Button, Text, useColorModeValue
} from '@chakra-ui/react'
import ItemList from '../ItemList/ItemList'
import { Link, useParams } from 'react-router-dom'
import Spinner from '../Spinner/Spinner'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../config/firebase'
import PageWrapper from '../PageWrapper/PageWrapper'
import HeroSection from '../HeroSection/HeroSection'

const BRANDS = [
  { label: 'Todos', path: '/' },
  { label: 'Nike', path: '/marca/Nike' },
  { label: 'Adidas', path: '/marca/Adidas' },
  { label: 'Under Armor', path: '/marca/Under_Armor' },
  { label: '361°', path: '/marca/361' },
]

const ItemListContainer = () => {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)
  const { markId } = useParams()
  // colorMode se maneja internamente en HeroSection

  const filterBg = useColorModeValue('white', '#13131C')
  const filterBorder = useColorModeValue('rgba(0,0,0,0.08)', 'rgba(255,82,0,0.15)')
  const pageBg = useColorModeValue('#F4F3EF', '#0A0A10')

  // Hero solo en la raíz, no en páginas de marca filtrada
  const showHero = !markId

  useEffect(() => {
    setLoading(true)
    const getData = async () => {
      try {
        const coleccion = collection(db, 'productos')
        const queryRef = markId
          ? query(coleccion, where('marca', '==', markId))
          : coleccion
        const response = await getDocs(queryRef)
        const allProducts = response.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))

        const filtered = allProducts.reduce((acc, current) => {
          const exists = acc.find(
            (item) => item.marca === current.marca && item.modelo === current.modelo
          )
          return exists ? acc : [...acc, current]
        }, [])

        const withStock = filtered.map((producto) => {
          const totalStock = allProducts
            .filter((p) => p.marca === producto.marca && p.modelo === producto.modelo)
            .reduce((acc, p) => acc + p.stock, 0)
          return { ...producto, outOfStock: totalStock === 0 }
        })

        const sorted = withStock.sort((a, b) => a.outOfStock - b.outOfStock)
        setProductos(sorted)
        setLoading(false)
      } catch {
        setLoading(false)
      }
    }
    getData()
  }, [markId])

  return (
    <PageWrapper pageType="catalog">
      <Box bg={pageBg} minH="calc(100vh - 68px)" className="court-pattern">

        {/* Hero — solo en "/" */}
        {showHero && <HeroSection />}

        {/* Brand filter bar */}
        <Box
          id="productos"
          bg={filterBg}
          borderBottom={`1px solid ${filterBorder}`}
          px={{ base: 4, md: 6 }}
          py={3}
          position="sticky"
          top="68px"
          zIndex={100}
          backdropFilter="blur(8px)"
          style={{ WebkitBackdropFilter: 'blur(8px)' }}
        >
          <Flex
            gap={2}
            overflowX="auto"
            align="center"
            sx={{
              '&::-webkit-scrollbar': { display: 'none' },
              scrollbarWidth: 'none',
            }}
          >
            <Text
              fontFamily="'Outfit', sans-serif"
              fontSize="11px"
              fontWeight="700"
              letterSpacing="0.12em"
              textTransform="uppercase"
              color={useColorModeValue('#999', '#555')}
              flexShrink={0}
              mr={1}
            >
              Marca
            </Text>
            {BRANDS.map(({ label, path }) => {
              const isActive =
                label === 'Todos' ? !markId : markId === label.replace(' ', '_')
              return (
                <Link to={path} key={label} style={{ flexShrink: 0 }}>
                  <Button
                    size="sm"
                    fontFamily="'Outfit', sans-serif"
                    fontWeight={isActive ? '700' : '500'}
                    fontSize="13px"
                    letterSpacing="0.02em"
                    px={4}
                    h="32px"
                    borderRadius="20px"
                    bg={isActive ? '#FF5200' : 'transparent'}
                    color={isActive ? 'white' : useColorModeValue('#444', '#AAA')}
                    border={isActive ? 'none' : `1px solid ${filterBorder}`}
                    boxShadow={isActive ? '0 3px 12px rgba(255,82,0,0.35)' : 'none'}
                    _hover={{
                      bg: isActive ? '#FF7A3D' : 'rgba(255,82,0,0.08)',
                      color: isActive ? 'white' : '#FF5200',
                      borderColor: 'rgba(255,82,0,0.4)',
                    }}
                    transition="all 0.2s ease"
                  >
                    {label}
                  </Button>
                </Link>
              )
            })}
          </Flex>
        </Box>

        {/* Product grid */}
        {loading ? (
          <Flex justify="center" align="center" h="60vh">
            <Spinner />
          </Flex>
        ) : (
          <ItemList productos={productos} />
        )}
      </Box>
    </PageWrapper>
  )
}

export default ItemListContainer