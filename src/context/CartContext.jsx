import React, { createContext, useContext, useState, useCallback } from 'react'

const CartContext = createContext(null)

export const CartProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState(null)

  const setCart = useCallback((item) => {
    setCartItem(item)
  }, [])

  const clearCart = useCallback(() => {
    setCartItem(null)
  }, [])

  return (
    <CartContext.Provider value={{ cartItem, setCart, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}

export default CartContext
