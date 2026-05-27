// formatCurrency.js
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

// Alias for formatCurrency — used by CheckoutPage and PaymentPage
export const formatRupiah = formatCurrency

export const formatNumber = (num) => {
  return new Intl.NumberFormat('id-ID').format(num)
}
