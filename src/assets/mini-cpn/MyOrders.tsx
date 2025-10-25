import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/table";
import { useCart } from "../layouts/menu-cpn/CartContext";
import type { CartItem } from "../layouts/menu-cpn/CartContext";

const MyOrders: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, removeItem, fetchCart, removingItems } = useCart();

  // Load giỏ hàng khi component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // chưa login → redirect
      return;
    }
    fetchCart(); // load từ backend/localStorage
  }, [navigate, fetchCart]);

  const getTotalPrice = (price: number, quantity: number) => price * quantity;

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md border border-pink-100">
      <h2 className="text-2xl font-semibold text-pink-500 mb-4">
        Giỏ hàng của bạn
      </h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Chưa có sản phẩm nào</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Hình ảnh</TableHead>
              <TableHead>Tên sản phẩm</TableHead>
              <TableHead>Số lượng</TableHead>
              <TableHead>Giá</TableHead>
              <TableHead>Tổng</TableHead>
              <TableHead>Hành động</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {cartItems.map((item: CartItem) => (
              <TableRow key={item.id}>
                <TableCell>
                  <img
                    src={
                      item.image
                        ? `/images-menu/${item.image}`
                        : "/images-menu/default.jpg"
                    }
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                </TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.price.toLocaleString()}đ</TableCell>
                <TableCell>
                  {getTotalPrice(item.price, item.quantity).toLocaleString()}đ
                </TableCell>
                <TableCell className="flex gap-2">
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-400"
                    disabled={removingItems.has(item.id)} // Disable nếu đang xóa
                    onClick={() => {
                      if (
                        window.confirm("Bạn có chắc muốn hủy sản phẩm này?")
                      ) {
                        removeItem(item.id);
                      }
                    }}
                  >
                    {removingItems.has(item.id) ? "Đang hủy..." : "Hủy"}
                  </button>
                  <button
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    onClick={() =>
                      navigate("/checkout", { state: { product: item } })
                    }
                  >
                    Thanh toán
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <div className="w-full mt-6 mb-4 flex justify-center px-4 md:px-0">
        <button
          onClick={() => navigate("/")}
          className="px-5 py-3 bg-pink-500 text-white rounded-lg shadow hover:bg-pink-600 transition w-full md:w-auto text-center"
        >
          ← Quay về trang chủ
        </button>
      </div>
    </div>
  );
};

export default MyOrders;
