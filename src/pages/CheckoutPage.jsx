// ============================================
// src/pages/CheckoutPage.jsx
// Halaman checkout dengan pilihan metode Pakasir
// ============================================

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { getPromoByCode } from "../data/promoData";
import { formatRupiah } from "../utils/formatCurrency";
import { generateOrderId } from "../utils/generateOrderId";
import { paymentMethods } from "../utils/pakasir";
import {
  Tag, ChevronRight, Shield, Zap,
  CheckCircle, XCircle, Loader2
} from "lucide-react";
import toast from "react-hot-toast";

const ADMIN_FEE = 2500;

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { order, setOrderData } = useCart();

  const [promoInput, setPromoInput] = useState("");
  const [promoApplied, setPromoApplied] = useState(null);
  const [promoError, setPromoError] = useState("");
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [loading, setLoading] = useState(false);

  // Kalau tidak ada order, redirect ke katalog
  if (!order || !order.item) {
    return (
      <div className="min-h-screen bg-[#080C14] flex items-center justify-center">
        <div className="text-center">
          <p className="text-white font-['Sora'] mb-4">Tidak ada order aktif</p>
          <button
            onClick={() => navigate("/catalog")}
            className="px-6 py-3 bg-cyan-500 text-[#080C14] font-bold font-['Sora'] rounded-xl"
          >
            Pilih Game
          </button>
        </div>
      </div>
    );
  }

  // Hitung harga
  const itemPrice = order.item.price;
  const discount = promoApplied
    ? promoApplied.type === "percent"
      ? Math.floor((itemPrice * promoApplied.discount) / 100)
      : promoApplied.discount
    : 0;
  const total = itemPrice - discount + ADMIN_FEE;

  // Apply promo
  const handleApplyPromo = () => {
    setPromoError("");
    if (!promoInput.trim()) return;
    const promo = getPromoByCode(promoInput.trim());
    if (!promo) {
      setPromoError("Kode promo tidak valid");
      setPromoApplied(null);
      return;
    }
    if (itemPrice < promo.minOrder) {
      setPromoError(`Minimum order ${formatRupiah(promo.minOrder)}`);
      setPromoApplied(null);
      return;
    }
    setPromoApplied(promo);
    toast.success(`Promo "${promo.code}" berhasil dipakai!`);
  };

  const handleRemovePromo = () => {
    setPromoApplied(null);
    setPromoInput("");
    setPromoError("");
  };

  // Proses ke payment
  const handlePay = async () => {
    if (!selectedMethod) {
      toast.error("Pilih metode pembayaran dulu!");
      return;
    }

    setLoading(true);

    const orderId = generateOrderId();

    // Simpan data order lengkap ke context
    setOrderData({
      ...order,
      orderId,
      promoCode: promoApplied?.code || null,
      discount,
      adminFee: ADMIN_FEE,
      total,
      paymentMethod: selectedMethod,
    });

    // Redirect ke PaymentPage
    // PaymentPage yang akan handle API Pakasir
    navigate("/payment");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#080C14] pt-20 pb-16">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-40 right-20 w-72 h-72 bg-cyan-500/4 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-2xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-white text-2xl font-bold font-['Orbitron']">
            Checkout
          </h1>
          <p className="text-[#6B7280] text-sm font-['Sora'] mt-1">
            Review pesanan dan pilih pembayaran
          </p>
        </div>

        {/* Order Summary */}
        <div className="bg-[#0D1117] border border-white/5 rounded-2xl p-5 mb-5">
          <h3 className="text-white font-bold font-['Sora'] text-sm mb-4">
            Detail Pesanan
          </h3>
          <div className="flex items-center gap-4 p-4 bg-white/[0.02] rounded-xl mb-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
              style={{ background: `${order.game?.color || "#00D4FF"}15` }}
            >
              {order.game?.category === "MOBA" && "⚔️"}
              {order.game?.category === "Battle Royale" && "🔥"}
              {order.game?.category === "RPG" && "✨"}
              {order.game?.category === "FPS" && "🎯"}
              {order.game?.category === "Strategy" && "🏰"}
            </div>
            <div className="flex-1">
              <p className="text-white font-bold font-['Sora'] text-sm">
                {order.game?.name}
              </p>
              <p className="text-cyan-400 font-['Sora'] text-sm">
                {order.item?.label}
              </p>
              <p className="text-[#6B7280] text-xs font-['Sora'] mt-0.5">
                ID: {Object.values(order.gameInputs || {}).join(" · ")}
              </p>
            </div>
            <p className="text-white font-bold font-['Sora']">
              {formatRupiah(itemPrice)}
            </p>
          </div>
        </div>

        {/* Promo Code */}
        <div className="bg-[#0D1117] border border-white/5 rounded-2xl p-5 mb-5">
          <h3 className="text-white font-bold font-['Sora'] text-sm mb-4 flex items-center gap-2">
            <Tag size={15} className="text-cyan-400" />
            Kode Promo
          </h3>

          {promoApplied ? (
            <div className="flex items-center justify-between p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-emerald-400" />
                <div>
                  <p className="text-emerald-400 text-sm font-bold font-['Sora']">
                    {promoApplied.code}
                  </p>
                  <p className="text-emerald-400/70 text-xs font-['Sora']">
                    {promoApplied.description}
                  </p>
                </div>
              </div>
              <button
                onClick={handleRemovePromo}
                className="text-[#6B7280] hover:text-red-400 transition-colors"
              >
                <XCircle size={18} />
              </button>
            </div>
          ) : (
            <div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Masukkan kode promo"
                  value={promoInput}
                  onChange={(e) => {
                    setPromoInput(e.target.value.toUpperCase());
                    setPromoError("");
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handleApplyPromo()}
                  className="flex-1 bg-[#111827] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm font-['Sora'] placeholder-[#374151] focus:outline-none focus:border-cyan-500/50 transition-colors"
                />
                <button
                  onClick={handleApplyPromo}
                  className="px-4 py-2.5 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-['Sora'] font-medium rounded-xl hover:bg-cyan-500/20 transition-colors"
                >
                  Pakai
                </button>
              </div>
              {promoError && (
                <p className="text-red-400 text-xs font-['Sora'] mt-2 flex items-center gap-1">
                  <XCircle size={12} /> {promoError}
                </p>
              )}
              <p className="text-[#374151] text-xs font-['Sora'] mt-2">
                Coba: NEXA10 · HEMAT5K · NEWUSER
              </p>
            </div>
          )}
        </div>

        {/* Payment Method */}
        <div className="bg-[#0D1117] border border-white/5 rounded-2xl p-5 mb-5">
          <h3 className="text-white font-bold font-['Sora'] text-sm mb-4 flex items-center gap-2">
            <Zap size={15} className="text-cyan-400" />
            Metode Pembayaran
          </h3>

          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method)}
                className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 text-left ${
                  selectedMethod?.id === method.id
                    ? "border-cyan-500/50 bg-cyan-500/10 shadow-lg shadow-cyan-500/10"
                    : "border-white/5 bg-white/[0.02] hover:border-white/10"
                }`}
              >
                {/* Radio dot */}
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                    selectedMethod?.id === method.id
                      ? "border-cyan-400"
                      : "border-white/20"
                  }`}
                >
                  {selectedMethod?.id === method.id && (
                    <div className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  )}
                </div>

                {/* Icon */}
                <span className="text-2xl flex-shrink-0">{method.icon}</span>

                {/* Info */}
                <div className="flex-1">
                  <p className="text-white text-sm font-bold font-['Sora']">
                    {method.label}
                  </p>
                  <p className="text-[#6B7280] text-xs font-['Sora']">
                    {method.sublabel}
                  </p>
                </div>

                {/* Type badge */}
                <span
                  className={`text-xs px-2 py-1 rounded-lg font-['Sora'] flex-shrink-0 ${
                    method.type === "qris"
                      ? "bg-cyan-500/10 text-cyan-400"
                      : "bg-blue-500/10 text-blue-400"
                  }`}
                >
                  {method.type === "qris" ? "QRIS" : "VA"}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Price breakdown */}
        <div className="bg-[#0D1117] border border-white/5 rounded-2xl p-5 mb-6">
          <h3 className="text-white font-bold font-['Sora'] text-sm mb-4">
            Rincian Harga
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-[#6B7280] text-sm font-['Sora']">
                {order.item?.label}
              </span>
              <span className="text-white text-sm font-['Sora']">
                {formatRupiah(itemPrice)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6B7280] text-sm font-['Sora']">
                Biaya Admin
              </span>
              <span className="text-white text-sm font-['Sora']">
                {formatRupiah(ADMIN_FEE)}
              </span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between">
                <span className="text-emerald-400 text-sm font-['Sora']">
                  Diskon ({promoApplied?.code})
                </span>
                <span className="text-emerald-400 text-sm font-['Sora']">
                  - {formatRupiah(discount)}
                </span>
              </div>
            )}
            <div className="border-t border-white/5 pt-3 flex justify-between">
              <span className="text-white font-bold font-['Sora']">Total</span>
              <span className="text-cyan-400 font-bold font-['Orbitron'] text-lg">
                {formatRupiah(total)}
              </span>
            </div>
          </div>
        </div>

        {/* Security note */}
        <div className="flex items-center gap-2 mb-5 text-[#6B7280]">
          <Shield size={14} className="text-cyan-400 flex-shrink-0" />
          <p className="text-xs font-['Sora']">
            Pembayaran diproses aman via{" "}
            <span className="text-cyan-400 font-medium">Pakasir</span> —
            berlisensi Bank Indonesia
          </p>
        </div>

        {/* CTA Button */}
        <button
          onClick={handlePay}
          disabled={!selectedMethod || loading}
          className="w-full flex items-center justify-center gap-3 py-4 bg-cyan-500 hover:bg-cyan-400 disabled:bg-cyan-500/30 disabled:cursor-not-allowed text-[#080C14] font-bold font-['Sora'] rounded-xl transition-all duration-200 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 text-base"
        >
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Memproses...
            </>
          ) : (
            <>
              Bayar {formatRupiah(total)}
              <ChevronRight size={18} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
