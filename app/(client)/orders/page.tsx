"use client";

import { useEffect, useState } from "react";
import { Package, Clock, CheckCircle, XCircle, Truck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Order {
  id: string;
  amount: number;
  currency: string;
  status: string;
  created?: number;
  metadata?: {
    productName?: string;
    productImage?: string;
    productId?: string;
    quantity?: string;
  };
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/stripe/orders");
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const getStatusInfo = (status: string) => {
    switch (status.toLowerCase()) {
      case "succeeded":
      case "paid":
        return {
          icon: <CheckCircle className="w-5 h-5" />,
          text: "Tamamlandı",
          color: "text-green-600 bg-green-50 border-green-200",
        };
      case "pending":
        return {
          icon: <Clock className="w-5 h-5" />,
          text: "Beklemede",
          color: "text-yellow-600 bg-yellow-50 border-yellow-200",
        };
      case "shipped":
        return {
          icon: <Truck className="w-5 h-5" />,
          text: "Kargoda",
          color: "text-blue-600 bg-blue-50 border-blue-200",
        };
      case "failed":
        return {
          icon: <XCircle className="w-5 h-5" />,
          text: "Başarısız",
          color: "text-red-600 bg-red-50 border-red-200",
        };
      default:
        return {
          icon: <Package className="w-5 h-5" />,
          text: status,
          color: "text-gray-600 bg-gray-50 border-gray-200",
        };
    }
  };

  const formatDate = (timestamp?: number) => {
    if (!timestamp) return "Tarih bilinmiyor";
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-darkBlue mx-auto mb-4"></div>
          <p className="text-gray-600">Siparişleriniz yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Siparişlerim
          </h1>
          <p className="text-gray-600">
            Tüm siparişlerinizi buradan takip edebilirsiniz
          </p>
        </div>

        {/* Orders List */}
        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Henüz sipariş yok
            </h3>
            <p className="text-gray-600 mb-6">
              Alışverişe başlayın ve siparişleriniz burada görünsün!
            </p>
            <Link
              className="inline-block bg-darkBlue text-white px-6 py-2 rounded-md hover:bg-darkBlue/90 transition"
              href={"/"}
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const statusInfo = getStatusInfo(order.status);
              return (
                <div
                  key={order.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="p-6">
                    {/* Order Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm text-gray-500">
                            Sipariş No:
                          </span>
                          <span className="text-sm font-mono text-gray-700">
                            {order.id.slice(-12).toUpperCase()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">
                          {formatDate(order.created)}
                        </p>
                      </div>
                      <div
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${statusInfo.color}`}
                      >
                        {statusInfo.icon}
                        <span className="text-sm font-medium">
                          {statusInfo.text}
                        </span>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex gap-4 mb-4">
                      {order.metadata?.productImage ? (
                        <div className="flex-shrink-0">
                          <Image
                            src={order.metadata.productImage}
                            alt={order.metadata.productName || "Ürün"}
                            className="w-20 h-20 object-cover rounded-md border border-gray-200"
                          />
                        </div>
                      ) : (
                        <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-md flex items-center justify-center">
                          <Package className="w-8 h-8 text-gray-400" />
                        </div>
                      )}

                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-semibold text-gray-900 mb-1">
                          {order.metadata?.productName || "Ürün Adı"}
                        </h3>
                        {order.metadata?.quantity && (
                          <p className="text-sm text-gray-600 mb-1">
                            Adet: {order.metadata.quantity}
                          </p>
                        )}
                        {order.metadata?.productId && (
                          <p className="text-xs text-gray-500">
                            Ürün ID: {order.metadata.productId}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Price & Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div>
                        <span className="text-sm text-gray-500">Toplam:</span>
                        <span className="text-xl font-bold text-gray-900 ml-2">
                          {(order.amount / 100).toFixed(2)}{" "}
                          {order.currency.toUpperCase()}
                        </span>
                      </div>
                      <button className="text-sm text-darkBlue hover:text-darkBlue/80 font-medium transition">
                        Detayları Gör →
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
