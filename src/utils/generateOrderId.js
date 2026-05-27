export const generateOrderId = () => {
  const timestamp = Date.now()
  const random = Math.floor(Math.random() * 9000 + 1000)
  return `NX-${timestamp}-${random}`
}

export const formatOrderDate = (dateString) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}
