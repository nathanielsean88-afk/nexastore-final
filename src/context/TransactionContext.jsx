import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

const TransactionContext = createContext(null)

const STORAGE_KEY = 'nexastore_transactions'

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  const [currentTransaction, setCurrentTransaction] = useState(null)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions))
    } catch (e) {
      console.warn('Failed to save transactions to localStorage')
    }
  }, [transactions])

  const addTransaction = useCallback((transaction) => {
    const newTransaction = {
      ...transaction,
      createdAt: new Date().toISOString(),
    }
    setTransactions((prev) => [newTransaction, ...prev])
    setCurrentTransaction(newTransaction)
    return newTransaction
  }, [])

  const updateTransactionStatus = useCallback((orderId, status) => {
    setTransactions((prev) =>
      prev.map((t) =>
        t.orderId === orderId
          ? { ...t, status, updatedAt: new Date().toISOString() }
          : t
      )
    )
    setCurrentTransaction((prev) =>
      prev?.orderId === orderId ? { ...prev, status } : prev
    )
  }, [])

  const getTransactionById = useCallback(
    (orderId) => transactions.find((t) => t.orderId === orderId),
    [transactions]
  )

  const clearCurrentTransaction = useCallback(() => {
    setCurrentTransaction(null)
  }, [])

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        currentTransaction,
        addTransaction,
        updateTransactionStatus,
        getTransactionById,
        clearCurrentTransaction,
        setCurrentTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}

export const useTransaction = () => {
  const context = useContext(TransactionContext)
  if (!context) {
    throw new Error('useTransaction must be used within TransactionProvider')
  }
  return context
}

export default TransactionContext
