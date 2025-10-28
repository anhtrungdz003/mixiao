import React, { useEffect, useState } from "react";
import axios from "axios";
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
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    fetchCart();
    const interval = setInterval(fetchCart, 60 * 1000);
    return () => clearInterval(interval);
  }, [navigate, fetchCart]);

  useEffect(() => {
    setSelectedItems(cartItems.map((i) => i.id));
    setSelectAll(cartItems.length > 0);
  }, [cartItems]);

  const toggleItem = (id: number) => {
    const newSelected = selectedItems.includes(id)
      ? selectedItems.filter((i) => i !== id)
      : [...selectedItems, id];
    setSelectedItems(newSelected);
    setSelectAll(newSelected.length === cartItems.length);
  };

  const toggleAll = () => {
    if (selectAll) {
      setSelectedItems([]);
      setSelectAll(false);
    } else {
      setSelectedItems(cartItems.map((i) => i.id));
      setSelectAll(true);
    }
  };

  const getTotalPrice = (item: CartItem) => item.price * item.quantity;

  const getSelectedTotal = () => {
    return cartItems
      .filter((i) => selectedItems.includes(i.id))
      .reduce((sum, i) => sum + getTotalPrice(i), 0);
  };

  const getImageSrc = (image?: string) => {
    if (!image) return "/images-menu/default.jpg";
    if (image.startsWith("/uploads")) return `http://localhost:3000${image}`;
    if (!image.includes("/")) return `/images-menu/${image}`;
    return image;
  };

  const handleCheckoutSelected = () => {
    const products = cartItems.filter((i) => selectedItems.includes(i.id));
    navigate("/checkout", { state: { products } });
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md border border-pink-100">
      <h2 className="text-2xl font-semibold text-pink-500 mb-4">
        Giỏ hàng của bạn
      </h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Chưa có sản phẩm nào</p>
      ) : (
        <>
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
                      src={getImageSrc(item.image)}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.price.toLocaleString()}đ</TableCell>
                  <TableCell>{getTotalPrice(item).toLocaleString()}đ</TableCell>
                  <TableCell className="flex flex-col md:flex-row gap-2 items-start">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => toggleItem(item.id)}
                      className="w-5 h-5 accent-pink-500"
                    />
                    <button
                      className="px-1.5 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-400"
                      disabled={removingItems.has(item.id)}
                      onClick={async () => {
                        if (
                          !window.confirm("Bạn có chắc muốn hủy sản phẩm này?")
                        )
                          return;
                        try {
                          removingItems.add(item.id);
                          await axios.delete(
                            `http://localhost:3000/api/orders/cart/${item.id}`,
                            {
                              headers: {
                                Authorization: `Bearer ${localStorage.getItem(
                                  "token"
                                )}`,
                              },
                            }
                          );
                          removeItem(item.id);
                          setSelectedItems(
                            selectedItems.filter((i) => i !== item.id)
                          );
                        } catch (err) {
                          console.error(err);
                          alert("Xóa thất bại");
                        } finally {
                          removingItems.delete(item.id);
                        }
                      }}
                    >
                      {removingItems.has(item.id) ? "Đang hủy..." : "Hủy"}
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Footer */}
          <div className="sticky bottom-0 bg-white border-t p-3 flex flex-col md:flex-row gap-3 justify-between items-center">
            <label className="flex items-center gap-2 text-sm">
              {" "}
              {/* chữ nhỏ hơn */}
              <input
                type="checkbox"
                checked={selectAll}
                onChange={toggleAll}
                className="w-5 h-5 accent-pink-500" // checkbox nhỏ
              />
              Chọn tất cả
            </label>
            <button
              className="px-3 py-2 text-sm bg-green-500 text-white rounded hover:bg-green-600" // padding & font nhỏ
              onClick={handleCheckoutSelected}
              disabled={selectedItems.length === 0}
            >
              Thanh toán ({selectedItems.length} sản phẩm) -{" "}
              {getSelectedTotal().toLocaleString()}đ
            </button>
          </div>
        </>
      )}

      <div className="w-full mt-6 mb-4 flex justify-center gap-3 px-4 md:px-0">
        {/* Nút xem đơn hàng đã đặt */}
        <button
          onClick={() => navigate("/my-orders")}
          className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition w-full md:w-auto text-center"
        >
          Đơn hàng đã đặt
        </button>

        {/* Nút quay về trang chủ */}
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 text-sm bg-pink-500 text-white rounded-lg shadow hover:bg-pink-600 transition w-full md:w-auto text-center"
        >
          ← Quay về trang chủ
        </button>
      </div>
    </div>
  );
};

export default MyOrders;
