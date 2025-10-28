import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/dialog";
import { Button } from "@/components/button";

interface OrderItem {
  product_id: number;
  name: string;
  image: string;
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  status: string;
  total: number;
  created_at: string;
  items: OrderItem[];
  user_full_name?: string;
  email?: string;
  phone?: string;
  address?: string;
}

// Trạng thái
const statusLabels: Record<string, string> = {
  pending: "⏳ Chờ xác nhận",
  confirmed: "🧾 Đã xác nhận",
  shipped: "🚚 Đang giao",
  completed: "✅ Hoàn thành",
};

const OrderHistory: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState("all");
  const [detailOrder, setDetailOrder] = useState<Order | null>(null);
  const navigate = useNavigate();

  const getImageSrc = (image?: string) => {
    if (!image) return "/images-menu/default.jpg";
    if (image.startsWith("/uploads")) return `http://localhost:3000${image}`;
    if (!image.includes("/")) return `/images-menu/${image}`;
    return image;
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/orders/user", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const filtered = (res.data.data || []).filter(
          (o: Order) => o.status !== "cart"
        );
        setOrders(filtered);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrders();
  }, []);

  const filteredOrders =
    filter === "all"
      ? orders
      : orders.filter((o) => o.status.toLowerCase() === filter);

  const fetchOrderDetail = async (orderId: number) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/orders/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const orderData = Array.isArray(res.data.data)
        ? res.data.data[0]
        : res.data.data;
      setDetailOrder(orderData);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="relative pb-40">
      {/* Sticky header và filter */}
      <div className="sticky top-0 z-10 bg-white p-6 border-b border-pink-100 shadow-md">
        <h2 className="text-2xl font-semibold text-pink-500 mb-4">
          🧾 Đơn hàng đã đặt
        </h2>

        <div className="flex flex-wrap gap-2 mb-4">
          {["all", "pending", "confirmed", "shipped", "completed"].map((st) => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={`px-3 py-1 rounded-full text-sm border transition ${
                filter === st
                  ? "bg-pink-500 text-white border-pink-500"
                  : "bg-white border-gray-300 hover:bg-pink-50"
              }`}
            >
              {st === "all" ? "Tất cả" : statusLabels[st] || st.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 space-y-6">
        {filteredOrders.length === 0 ? (
          <p className="text-center text-gray-500">Không có đơn hàng nào</p>
        ) : (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-center mb-3">
                <div>
                  <p className="font-medium text-gray-700">
                    Mã đơn: #{order.id}
                  </p>
                  <p className="text-sm text-gray-500">
                    Ngày đặt:{" "}
                    {new Date(order.created_at).toLocaleString("vi-VN")}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    order.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : order.status === "confirmed"
                      ? "bg-blue-100 text-blue-700"
                      : order.status === "shipped"
                      ? "bg-indigo-100 text-indigo-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {statusLabels[order.status] || order.status}
                </span>
              </div>

              <div className="divide-y">
                {order.items.map((item) => (
                  <div
                    key={item.product_id}
                    className="flex gap-3 py-2 items-center"
                  >
                    <img
                      src={getImageSrc(item.image)}
                      alt={item.name}
                      className="w-16 h-16 rounded object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        SL: {item.quantity} × {item.price.toLocaleString()}đ
                      </p>
                    </div>
                    <p className="font-semibold text-gray-700">
                      {(item.price * item.quantity).toLocaleString()}đ
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center mt-3 border-t pt-2">
                <p className="text-gray-700 font-semibold">
                  Tổng: {order.total.toLocaleString()}đ
                </p>
                <button
                  onClick={() => fetchOrderDetail(order.id)}
                  className="px-3 py-1 text-sm bg-pink-500 text-white rounded hover:bg-pink-600"
                >
                  Xem chi tiết
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Dialog chi tiết đơn hàng */}
      <Dialog open={!!detailOrder} onOpenChange={() => setDetailOrder(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Chi tiết đơn hàng #{detailOrder?.id}</DialogTitle>
          </DialogHeader>

          {detailOrder && (
            <div className="bg-white p-4 rounded-lg max-h-[70vh] overflow-y-auto">
              {/* Thông tin khách hàng */}
              <div className="bg-pink-50 p-4 rounded-lg border border-pink-200 mb-4 space-y-1">
                <p>
                  <strong>Khách hàng:</strong> {detailOrder.user_full_name}
                </p>
                <p>
                  <strong>Email:</strong> {detailOrder.email}
                </p>
                <p>
                  <strong>SĐT:</strong> {detailOrder.phone}
                </p>
                <p>
                  <strong>Địa chỉ:</strong> {detailOrder.address}
                </p>
                <p>
                  <strong>Ngày đặt:</strong>{" "}
                  {new Date(detailOrder.created_at).toLocaleString("vi-VN")}
                </p>
                <p>
                  <strong>Trạng thái:</strong>{" "}
                  <span
                    className={`font-semibold ${
                      detailOrder.status === "completed"
                        ? "text-green-600"
                        : detailOrder.status === "pending"
                        ? "text-yellow-500"
                        : detailOrder.status === "shipped"
                        ? "text-indigo-600"
                        : "text-gray-500"
                    }`}
                  >
                    {statusLabels[detailOrder.status] || detailOrder.status}
                  </span>
                </p>
              </div>

              {/* Bảng sản phẩm */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border border-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-2 border">Ảnh</th>
                      <th className="p-2 border">Tên sản phẩm</th>
                      <th className="p-2 border">Số lượng</th>
                      <th className="p-2 border">Giá</th>
                      <th className="p-2 border">Thành tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    {detailOrder.items.map((item) => (
                      <tr key={item.product_id} className="border-b">
                        <td className="p-2 border">
                          <img
                            src={getImageSrc(item.image)}
                            alt={item.name}
                            className="w-12 h-12 rounded object-cover"
                          />
                        </td>
                        <td className="p-2 border">{item.name}</td>
                        <td className="p-2 border">{item.quantity}</td>
                        <td className="p-2 border">
                          {item.price.toLocaleString()}₫
                        </td>
                        <td className="p-2 border">
                          {(item.price * item.quantity).toLocaleString()}₫
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Tổng tiền */}
              <div className="text-right mt-4 font-semibold text-lg text-pink-600">
                Tổng cộng: {detailOrder.total.toLocaleString()}₫
              </div>

              {/* Nút đóng */}
              <div className="flex justify-end mt-4">
                <Button
                  className="bg-gray-300 text-black hover:bg-gray-400"
                  onClick={() => setDetailOrder(null)}
                >
                  Đóng
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Nút quay lại cố định dưới cùng */}
      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-20">
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 shadow-lg"
        >
          ← Quay về trang chủ
        </button>
      </div>
    </div>
  );
};

export default OrderHistory;
