import React, { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/dialog";
import { Button } from "@/components/button";

import { Trash2, Eye } from "lucide-react";

interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  product_name: string;
  quantity: number;
  price: number;
  image: string;
}

interface Order {
  id: number;
  total: number;
  status: string;
  created_at: string;
  user_full_name: string;
  email: string;
  phone: string;
  address: string;
  items?: OrderItem[];
}

const API_URL = "http://localhost:3000/api";

const OrderManager: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [detailOrder, setDetailOrder] = useState<Order | null>(null);
  const invoiceRef = useRef<HTMLDivElement>(null);

  const token = localStorage.getItem("token");

  // 🔹 Lấy danh sách đơn hàng
  const fetchOrders = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/orders/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data.data);
    } catch (err) {
      console.error("Fetch orders error:", err);
    }
  }, [token]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Xóa đơn hàng
  const deleteOrder = async (orderId: number) => {
    if (!window.confirm("Xác nhận xóa đơn hàng này?")) return;
    try {
      await axios.delete(`${API_URL}/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchOrders(); // tải lại danh sách
    } catch (err) {
      console.error(err);
      alert("Xóa đơn hàng thất bại");
    }
  };

  // 🔹 Lấy chi tiết đơn hàng
  const fetchOrderDetail = async (orderId: number) => {
    try {
      const res = await axios.get(`${API_URL}/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const orderData = Array.isArray(res.data.data)
        ? res.data.data[0]
        : res.data.data;
      setDetailOrder(orderData);
    } catch (err) {
      console.error("Fetch order detail error:", err);
    }
  };

  // 🔹 Đổi màu trạng thái
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600 font-semibold";
      case "pending":
        return "text-yellow-500 font-semibold";
      case "cancelled":
        return "text-red-500 font-semibold";
      default:
        return "text-gray-500";
    }
  };

  const handlePrint = () => {
    if (!invoiceRef.current) return;
    const printContents = invoiceRef.current.innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md border border-pink-100">
      <h2 className="text-2xl font-semibold text-pink-500 mb-4">
        Quản lý đơn hàng
      </h2>

      {/* Bảng đơn hàng */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-pink-50">
              <TableHead>Mã đơn</TableHead>
              <TableHead>Khách hàng</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>SĐT</TableHead>
              <TableHead>Địa chỉ</TableHead>
              <TableHead>Ngày đặt</TableHead>
              <TableHead>Tổng tiền</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-center">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((o) => (
              <TableRow key={o.id} className="hover:bg-pink-50">
                <TableCell>{o.id}</TableCell>
                <TableCell>{o.user_full_name}</TableCell>
                <TableCell>{o.email}</TableCell>
                <TableCell>{o.phone}</TableCell>
                <TableCell>{o.address}</TableCell>
                <TableCell>{new Date(o.created_at).toLocaleString()}</TableCell>
                <TableCell className="text-pink-600 font-semibold">
                  {o.items
                    ? o.items
                        .reduce(
                          (sum, item) => sum + item.price * item.quantity,
                          0
                        )
                        .toLocaleString()
                    : o.total.toLocaleString()}
                  ₫
                </TableCell>
                <TableCell className={getStatusColor(o.status)}>
                  {o.status}
                </TableCell>
                <TableCell className="flex justify-center gap-2">
                  <button
                    onClick={() => fetchOrderDetail(o.id)}
                    className="p-1 text-blue-500 hover:text-blue-700"
                    title="Xem chi tiết"
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    onClick={() => deleteOrder(o.id)}
                    className="p-1 text-red-500 hover:text-red-700"
                    title="Xóa đơn hàng"
                  >
                    <Trash2 size={18} />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!detailOrder} onOpenChange={() => setDetailOrder(null)}>
        <DialogContent className="max-w-4xl ">
          <DialogHeader>
            <DialogTitle>Chi tiết đơn hàng #{detailOrder?.id}</DialogTitle>
          </DialogHeader>

          {detailOrder && (
            <div
              id="invoice-content"
              ref={invoiceRef}
              className="bg-white p-4 rounded-lg"
            >
              {/* Thông tin khách hàng */}
              <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
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
                  {new Date(detailOrder.created_at).toLocaleString()}
                </p>
                <p>
                  <strong>Trạng thái:</strong>{" "}
                  <span className={getStatusColor(detailOrder.status)}>
                    {detailOrder.status}
                  </span>
                </p>
              </div>

              {/* Bảng sản phẩm */}
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-100">
                      <TableHead>Ảnh</TableHead>
                      <TableHead>Tên sản phẩm</TableHead>
                      <TableHead>Số lượng</TableHead>
                      <TableHead>Giá</TableHead>
                      <TableHead>Thành tiền</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {detailOrder.items?.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <img
                            src={
                              item.image.startsWith("http")
                                ? item.image
                                : `/images-menu/${item.image}`
                            }
                            alt={item.product_name}
                            className="w-12 h-12 rounded-md object-cover"
                          />
                        </TableCell>
                        <TableCell>{item.product_name}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>{item.price.toLocaleString()}₫</TableCell>
                        <TableCell>
                          {(item.price * item.quantity).toLocaleString()}₫
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}

          {/* Nút thao tác */}
          <div className="flex justify-end gap-2 mt-4">
            <Button
              className="bg-blue-500 text-white hover:bg-blue-600"
              onClick={handlePrint}
            >
              In hóa đơn
            </Button>
            <Button
              className="bg-gray-300 text-black hover:bg-gray-400"
              onClick={() => setDetailOrder(null)}
            >
              Đóng
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrderManager;
