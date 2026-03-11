import './App.css'
import 'react-toastify/dist/ReactToastify.css'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { AnimatePresence } from 'framer-motion'
import theme from './theme'
import ItemListContainer from './components/ItemListContainer/ItemListContainer'
import NavBar from './components/NavBar/NavBar'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer'
import PageNotFound from './components/PageNotFound/PageNotFound'
import { CartContextProvider } from './context/CartContext'
import Cart from './components/Cart/Cart'
import Checkout from './components/Checkout/Checkout'

// Componente interno para poder usar useLocation (necesario para AnimatePresence)
const AnimatedRoutes = () => {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<ItemListContainer />} />
        <Route path="/marca/:markId" element={<ItemListContainer />} />
        <Route path="/producto/:productId" element={<ItemDetailContainer />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  return (
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>
        <CartContextProvider>
          <BrowserRouter>
            <NavBar title="BasketDrip" />
            <AnimatedRoutes />
          </BrowserRouter>
        </CartContextProvider>
      </ChakraProvider>
    </>
  )
}

export default App
