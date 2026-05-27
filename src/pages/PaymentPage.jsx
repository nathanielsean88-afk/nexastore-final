// ============================================
// src/pages/PaymentPage.jsx
// Halaman payment dengan integrasi Pakasir API
// ============================================

import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useTransaction } from "../context/TransactionContext";
import { createPayment, checkPaymentStatus } from "../utils/pakasir";
import { formatRupiah } from "../utils/formatCurrency";
import {
  Clock, Copy, CheckCircle, XCircle,
  Loader2, RefreshCw, AlertTriangle, Zap
} from "lucide-react";
import toast from "react-hot-toast";

const PAYMENT_DURATION = 15 * 60; // 15 menit dalam detik
const POLL_INTERVAL = 10000; // cek status tiap 10 detik

export default function PaymentPage() {
  const navigate = useNavigate();
  const { order, clearOrder } = useCart();
  const { saveTransaction } = useTransaction();

  const [paymentData, setPaymentData] = useState(null);
  const [timeLeft, setTimeLeft] = useState(PAYMENT_DURATION);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [checking, setChecking] = useState(false);

  const pollRef = useRef(null);
  const timerRef = useRef(null);

  // ── Init: buat payment di Pakasir ──────────
  const initPayment = useCallback(async () => {
    if (!order?.orderId) {
      navigate("/catalog");
      return;
    }

    setLoading(true);
    setError(null);

    const result = await createPayment({
      orderId: order.orderId,
      amount: order.total,
      method: order.paymentMethod?.id || "qris",
      redirectUrl: `${window.location.origin}/payment/status`,
    });

    if (result.success) {
      setPaymentData(result.data);
      setLoading(false);
      startPolling(order.orderId);
      startTimer();
    } else {
      setError(result.error || "Gagal membuat pembayaran. Coba lagi.");
      setLoading(false);
    }
  }, [order]);

  useEffect(() => {
    initPayment();
    return () => {
      clearInterval(pollRef.current);
      clearInterval(timerRef.current);
    };
  }, []);

  // ── Countdown timer ─────────────────────────
  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          clearInterval(pollRef.current);
          handleExpired();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleExpired = () => {
    saveTransaction({
      ...order,
      status: "failed",
      failReason: "Waktu pembayaran habis",
      paidAt: new Date().toISOString(),
    });
    navigate("/payment/status");
  };

  // ── Auto polling status ─────────────────────
  const startPolling = (orderId) => {
    pollRef.current = setInterval(async () => {
      const res = await checkPaymentStatus(orderId);
      if (res.status === "success") {
        clearInterval(pollRef.current);
        clearInterval(timerRef.current);
        handlePaymentSuccess();
      } else if (res.status === "failed") {
        clearInterval(pollRef.current);
        clearInterval(timerRef.current);
        handlePaymentFailed();
      }
    }, POLL_INTERVAL);
  };

  // ── Manual check ────────────────────────────
  const handleManualCheck = async () => {
    if (!order?.orderId) return;
    setChecking(true);
    const res = await checkPaymentStatus(order.orderId);
    setChecking(false);

    if (res.status === "success") {
      clearInterval(pollRef.current);
      clearInterval(timerRef.current);
      handlePaymentSuccess();
    } else if (res.status === "failed") {
      handlePaymentFailed();
    } else {
      toast("Pembayaran belum terdeteksi, tunggu sebentar...", {
        icon: "⏳",
      });
    }
  };

  const handlePaymentSuccess = () => {
    saveTransaction({
      ...order,
      status: "success",
      paidAt: new Date().toISOString(),
    });
    clearOrder();
    navigate("/payment/status");
  };

  const handlePaymentFailed = () => {
    saveTransaction({
      ...order,
      status: "failed",
      paidAt: new Date().toISOString(),
    });
    navigate("/payment/status");
  };

  const handleCancel = () => {
    clearInterval(pollRef.current);
    clearInterval(timerRef.current);
    saveTransaction({
      ...order,
      status: "failed",
      failReason: "Dibatalkan oleh pengguna",
      paidAt: new Date().toISOString(),
    });
    navigate("/payment/status");
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Disalin!");
    setTimeout(() => setCopied(false), 2000);
  };

  // ── Format timer ────────────────────────────
  const mins = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const secs = String(timeLeft % 60).padStart(2, "0");
  const isUrgent = timeLeft < 180; // < 3 menit

  const isQRIS = order?.paymentMethod?.type === "qris";
  const isVA = order?.paymentMethod?.type === "va";

  // ── Loading state ───────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-[#080C14] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full border-2 border-cyan-500/30 border-t-cyan-500 animate-spin mx-auto mb-4" />
          <p className="text-white font-['Sora'] font-medium mb-1">
            Membuat pembayaran...
          </p>
          <p className="text-[#6B7280] text-sm font-['Sora']">
            Menghubungi Pakasir
          </p>
        </div>
      </div>
    );
  }

  // ── Error state ─────────────────────────────
  if (error) {
    return (
      <div className="min-h-screen bg-[#080C14] flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
            <AlertTriangle size={28} className="text-red-400" />
          </div>
          <h2 className="text-white font-bold font-['Orbitron'] mb-2">
            Gagal Membuat Pembayaran
          </h2>
          <p className="text-[#6B7280] text-sm font-['Sora'] mb-6">{error}</p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={initPayment}
              className="px-5 py-3 bg-cyan-500 text-[#080C14] font-bold font-['Sora'] rounded-xl hover:bg-cyan-400 transition-colors"
            >
              Coba Lagi
            </button>
            <button
              onClick={() => navigate("/checkout")}
              className="px-5 py-3 bg-white/5 border border-white/10 text-white font-['Sora'] rounded-xl hover:bg-white/10 transition-colors"
            >
              Kembali
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080C14] pt-20 pb-16">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-40 left-1/2 -translate-x-1/2 w-80 h-80 bg-cyan-500/4 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-lg mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-[#0D1117] border border-white/10 px-4 py-2 rounded-full mb-3">
            <span className="text-xl">{order?.paymentMethod?.icon}</span>
            <span className="text-white text-sm font-['Sora'] font-medium">
              {order?.paymentMethod?.label}
            </span>
          </div>
          <h1 className="text-white text-xl font-bold font-['Orbitron']">
            Selesaikan Pembayaran
          </h1>
        </div>

        {/* Timer */}
        <div
          className={`flex items-center justify-center gap-3 p-4 rounded-2xl border mb-6 transition-colors ${
            isUrgent
              ? "bg-red-500/10 border-red-500/30"
              : "bg-[#0D1117] border-white/5"
          }`}
        >
          <Clock
            size={18}
            className={isUrgent ? "text-red-400 animate-pulse" : "text-cyan-400"}
          />
          <span
            className={`font-['Orbitron'] font-bold text-2xl tracking-widest ${
              isUrgent ? "text-red-400" : "text-white"
            }`}
          >
            {mins}:{secs}
          </span>
          <span className="text-[#6B7280] text-sm font-['Sora']">
            {isUrgent ? "⚠️ Segera bayar!" : "Sisa waktu"}
          </span>
        </div>

        {/* Total */}
        <div className="bg-[#0D1117] border border-cyan-500/20 rounded-2xl p-5 mb-5 text-center">
          <p className="text-[#6B7280] text-sm font-['Sora'] mb-1">
            Total yang harus dibayar
          </p>
          <p className="text-cyan-400 font-bold font-['Orbitron'] text-3xl">
            {formatRupiah(order?.total || 0)}
          </p>
          <p className="text-[#374151] text-xs font-['Sora'] mt-1">
            Order ID: {order?.orderId}
          </p>
        </div>

        {/* QRIS Section */}
        {isQRIS && (
          <div className="bg-[#0D1117] border border-white/5 rounded-2xl p-5 mb-5">
            <h3 className="text-white font-bold font-['Sora'] text-sm text-center mb-4">
              Scan QR Code
            </h3>

            {/* QR Code */}
            <div className="flex justify-center mb-4">
              {paymentData?.qrImageUrl ? (
                <img
                  src={paymentData.qrImageUrl}
                  alt="QR Code Pakasir"
                  className="w-52 h-52 rounded-xl bg-white p-2"
                />
              ) : (
                <div className="w-52 h-52 bg-white rounded-xl flex items-center justify-center">
                  <div className="text-center p-4">
                    <div className="text-4xl mb-2">🔲</div>
                    <p className="text-gray-500 text-xs">QR Code</p>
                    <p className="text-gray-400 text-xs">{order?.orderId}</p>
                  </div>
                </div>
              )}
            </div>

            <p className="text-[#6B7280] text-xs font-['Sora'] text-center mb-4">
              Buka aplikasi e-wallet kamu → Scan QR → Bayar
            </p>

            {/* Supported wallets */}
            <div className="flex justify-center gap-3 flex-wrap">
              {["GoPay", "OVO", "DANA", "ShopeePay", "LinkAja"].map((w) => (
                <span
                  key={w}
                  className="text-xs px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-[#6B7280] font-['Sora']"
                >
                  {w}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Virtual Account Section */}
        {isVA && (
          <div className="bg-[#0D1117] border border-white/5 rounded-2xl p-5 mb-5">
            <h3 className="text-white font-bold font-['Sora'] text-sm mb-4">
              Nomor Virtual Account
            </h3>

            {/* VA Number */}
            <div className="flex items-center gap-3 p-4 bg-white/[0.03] border border-white/10 rounded-xl mb-4">
              <div className="flex-1">
                <p className="text-[#6B7280] text-xs font-['Sora'] mb-1">
                  {order?.paymentMethod?.label}
                </p>
                <p className="text-white font-bold font-['Orbitron'] text-xl tracking-widest">
                  {paymentData?.virtualAccount || "8277-XXXX-XXXX-XXXX"}
                </p>
              </div>
              <button
                onClick={() => handleCopy(paymentData?.virtualAccount || "")}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                  copied
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20"
                }`}
              >
                {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
              </button>
            </div>

            {/* Instruksi */}
            <div className="space-y-2">
              <p className="text-[#6B7280] text-xs font-['Sora'] font-medium mb-2">
                Cara Bayar:
              </p>
              {[
                `Buka M-Banking / ATM ${order?.paymentMethod?.label?.replace(" Virtual Account", "")}`,
                "Pilih Transfer → Virtual Account",
                `Masukkan nomor VA di atas`,
                `Masukkan nominal ${formatRupiah(order?.total || 0)} (harus tepat)`,
                "Konfirmasi pembayaran",
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold font-['Sora'] flex items-center justify-center flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-[#6B7280] text-xs font-['Sora']">{step}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Order detail */}
        <div className="bg-[#0D1117] border border-white/5 rounded-2xl p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white text-sm font-['Sora'] font-medium">
                {order?.game?.name}
              </p>
              <p className="text-cyan-400 text-xs font-['Sora']">
                {order?.item?.label}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[#6B7280] text-xs font-['Sora']">
                {Object.values(order?.gameInputs || {}).join(" / ")}
              </p>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="space-y-3">
          {/* Manual check button */}
          <button
            onClick={handleManualCheck}
            disabled={checking}
            className="w-full flex items-center justify-center gap-2 py-4 bg-cyan-500 hover:bg-cyan-400 disabled:bg-cyan-500/50 text-[#080C14] font-bold font-['Sora'] rounded-xl transition-all shadow-lg shadow-cyan-500/20"
          >
            {checking ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Mengecek Status...
              </>
            ) : (
              <>
                <Zap size={18} />
                Saya Sudah Bayar
              </>
            )}
          </button>

          {/* Refresh QR */}
          {isQRIS && (
            <button
              onClick={initPayment}
              className="w-full flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 text-[#6B7280] hover:text-white hover:border-white/20 font-['Sora'] text-sm rounded-xl transition-all"
            >
              <RefreshCw size={15} />
              Perbarui QR Code
            </button>
          )}

          {/* Cancel */}
          <button
            onClick={handleCancel}
            className="w-full py-3 text-red-400/70 hover:text-red-400 font-['Sora'] text-sm transition-colors"
          >
            Batalkan Pesanan
          </button>
        </div>

        {/* Security note */}
        <p className="text-center text-[#374151] text-xs font-['Sora'] mt-6">
          🔒 Pembayaran diproses aman oleh{" "}
          <span className="text-[#6B7280]">Pakasir</span> · Berlisensi Bank Indonesia
        </p>
      </div>
    </div>
  );
}
