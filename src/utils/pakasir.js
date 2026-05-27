// ============================================
// src/utils/pakasir.js
// Helper function untuk integrasi Pakasir API
// Isi VITE_PAKASIR_SLUG dan VITE_PAKASIR_API_KEY di .env
// ============================================

const PAKASIR_SLUG = import.meta.env.VITE_PAKASIR_SLUG;
const PAKASIR_API_KEY = import.meta.env.VITE_PAKASIR_API_KEY;
const PAKASIR_BASE_URL = "https://api.pakasir.com";

export const createPayment = async ({ orderId, amount, method = "qris", redirectUrl }) => {
  try {
    const res = await fetch(`${PAKASIR_BASE_URL}/payment/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${PAKASIR_API_KEY}`,
        "X-Project-Slug": PAKASIR_SLUG,
      },
      body: JSON.stringify({
        order_id: orderId,
        amount: amount,
        payment_method: method,
        redirect_url: redirectUrl || `${window.location.origin}/payment/status`,
        expired_time: 15,
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Gagal membuat pembayaran");
    return {
      success: true,
      data: {
        transactionId: data.transaction_id || data.id,
        paymentUrl: data.payment_url,
        qrCode: data.qr_code || data.qr_string,
        qrImageUrl: data.qr_image_url,
        virtualAccount: data.virtual_account,
        bankCode: data.bank_code,
        amount: data.amount,
        expiredAt: data.expired_at,
        status: data.status,
      },
    };
  } catch (err) {
    console.error("[Pakasir] createPayment error:", err);
    return { success: false, error: err.message };
  }
};

export const checkPaymentStatus = async (orderId) => {
  try {
    const res = await fetch(`${PAKASIR_BASE_URL}/payment/status/${orderId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${PAKASIR_API_KEY}`,
        "X-Project-Slug": PAKASIR_SLUG,
      },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Gagal cek status");
    const statusMap = { paid: "success", pending: "pending", expired: "failed", failed: "failed" };
    return {
      success: true,
      status: statusMap[data.status] || "pending",
      rawStatus: data.status,
      data,
    };
  } catch (err) {
    console.error("[Pakasir] checkStatus error:", err);
    return { success: false, error: err.message, status: "pending" };
  }
};

export const paymentMethods = [
  { id: "qris", label: "QRIS", sublabel: "GoPay, OVO, DANA, ShopeePay, dll", icon: "🔲", type: "qris" },
  { id: "bca", label: "BCA Virtual Account", sublabel: "Transfer via ATM / M-Banking BCA", icon: "🏦", type: "va", bankCode: "bca" },
  { id: "bni", label: "BNI Virtual Account", sublabel: "Transfer via ATM / M-Banking BNI", icon: "🏦", type: "va", bankCode: "bni" },
  { id: "bri", label: "BRI Virtual Account", sublabel: "Transfer via ATM / M-Banking BRI", icon: "🏦", type: "va", bankCode: "bri" },
  { id: "mandiri", label: "Mandiri Virtual Account", sublabel: "Transfer via ATM / M-Banking Mandiri", icon: "🏦", type: "va", bankCode: "mandiri" },
];
