import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface CartItem {
  id: number;
  product_id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Cart {
  id: number;
  items: CartItem[];
  total: number;
}

const API_URL = "http://localhost:3000/api";

const Checkout: React.FC = () => {
  const [cart, setCart] = useState<Cart | null>(null);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: "",
  });
  type UserInfoKey = keyof typeof userInfo;
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [note, setNote] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);

  const shippingFees: Record<string, number> = {
    standard: 20000,
    fast: 50000,
    express: 80000,
  };

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchCart();
    fetchUserInfo();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await axios.get(`${API_URL}/orders/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUserInfo = async () => {
    try {
      const res = await axios.get(`${API_URL}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = res.data.data;
      if (data) setUserInfo(data);
    } catch (err) {
      console.error(err);
    }
  };

  const totalPrice = cart
    ? cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0)
    : 0;

  const totalAfterDiscount =
    totalPrice + shippingFees[shippingMethod] - discountAmount;

  const removeItem = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/orders/cart/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  const applyDiscount = async () => {
    if (!discountCode) return;
    let amount = 0;
    if (discountCode.toLowerCase() === "anhdz2003") amount = totalPrice * 0.2;
    setDiscountAmount(amount);
    alert(`Áp dụng mã giảm giá thành công: -${amount.toLocaleString()}₫`);
  };

  const placeOrder = async () => {
    if (!cart || cart.items.length === 0) {
      alert("Giỏ hàng trống");
      return;
    }
    try {
      const payload = {
        items: cart.items.map((i) => ({
          product_id: i.product_id,
          quantity: i.quantity,
        })),
        full_name: userInfo.full_name,
        email: userInfo.email,
        phone: userInfo.phone,
        address: userInfo.address,
        shippingMethod,
        paymentMethod,
        discount: discountAmount,
        note,
      };
      const { data } = await axios.post(`${API_URL}/orders/`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const orderId = data.order.id;
      navigate("/success", { state: { orderId } });
      setCart(null);
      setDiscountCode("");
      setDiscountAmount(0);
      setNote("");
    } catch (err) {
      console.error(err);
      alert("Đặt hàng thất bại");
    }
  };

  // Hàm lấy src ảnh
  const getImageSrc = (image: string) => {
    if (!image) return "";
    if (image.startsWith("/uploads")) return `http://localhost:3000${image}`;
    if (!image.includes("/")) return `/images-menu/${image}`;
    return image;
  };

  if (!cart) return <p>Đang tải giỏ hàng...</p>;

  return (
    <div className="p-6 pb-12 bg-white rounded-xl shadow-md max-w-5xl mx-auto space-y-6 ">
      <h2 className="text-2xl font-semibold text-pink-500">Thanh toán</h2>

      {cart.items.length === 0 ? (
        <p>Giỏ hàng trống</p>
      ) : (
        <>
          {/* Giỏ hàng */}
          <table className="w-full mb-4 table-auto border border-gray-200 text-left">
            <thead className="bg-pink-50">
              <tr>
                <th className="p-2">Ảnh</th>
                <th className="p-2">Sản phẩm</th>
                <th className="p-2 text-center">SL</th>
                <th className="p-2 text-right">Giá</th>
                <th className="p-2 text-right">Thành tiền</th>
                <th className="p-2 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {cart.items.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="p-2">
                    <img
                      src={getImageSrc(item.image)}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded mx-auto"
                    />
                  </td>
                  <td className="p-2">{item.name}</td>
                  <td className="p-2 text-center">{item.quantity}</td>
                  <td className="p-2 text-right">
                    {item.price.toLocaleString()}₫
                  </td>
                  <td className="p-2 text-right">
                    {(item.price * item.quantity).toLocaleString()}₫
                  </td>
                  <td className="p-2 text-center">
                    <button
                      className="text-red-500 hover:underline"
                      onClick={() => removeItem(item.id)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Thông tin khách hàng */}
          <div className="border p-4 rounded-lg space-y-2">
            <h3 className="font-semibold">Thông tin khách hàng</h3>
            {(["full_name", "email", "phone", "address"] as UserInfoKey[]).map(
              (key) => (
                <input
                  key={key}
                  className="border p-2 w-full rounded"
                  placeholder={key.replace("_", " ").toUpperCase()}
                  value={userInfo[key]}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, [key]: e.target.value })
                  }
                />
              )
            )}
          </div>

          {/* Phương thức vận chuyển */}
          <div className="border p-4 rounded-lg space-y-2">
            <h3 className="font-semibold">Phương thức vận chuyển</h3>
            {Object.entries(shippingFees).map(([method, fee]) => (
              <label key={method} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="shipping"
                  checked={shippingMethod === method}
                  onChange={() => setShippingMethod(method)}
                  className="accent-pink-500"
                />
                <span className="capitalize">
                  {method} - {fee.toLocaleString()}₫
                </span>
              </label>
            ))}
          </div>

          {/* Phương thức thanh toán */}
          <div className="border p-4 rounded-lg space-y-2">
            <h3 className="font-semibold">Phương thức thanh toán</h3>
            {["cod", "card", "ewallet"].map((method) => (
              <label key={method} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === method}
                  onChange={() => setPaymentMethod(method)}
                  className="accent-pink-500"
                />
                {method === "cod"
                  ? "COD"
                  : method === "card"
                  ? "Thẻ ngân hàng"
                  : "Ví điện tử"}
              </label>
            ))}
          </div>

          {/* Mã giảm giá */}
          <div className="flex gap-2 items-center">
            <input
              className="border p-2 rounded flex-1"
              placeholder="Mã giảm giá"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
            />
            <button
              className="bg-pink-500 text-white px-4 py-2 rounded"
              onClick={applyDiscount}
            >
              Áp dụng
            </button>
          </div>

          {/* Ghi chú */}
          <textarea
            className="border p-2 w-full rounded"
            placeholder="Ghi chú đơn hàng"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />

          {/* Tóm tắt */}
          <div className="border p-4 rounded-lg text-right space-y-1">
            <p>Tổng tiền sản phẩm: {totalPrice.toLocaleString()}₫</p>
            <p>
              Phí vận chuyển: {shippingFees[shippingMethod].toLocaleString()}₫
            </p>
            {discountAmount > 0 && (
              <p>Giảm giá: -{discountAmount.toLocaleString()}₫</p>
            )}
            <p className="font-semibold text-xl">
              Thanh toán cuối: {totalAfterDiscount.toLocaleString()}₫
            </p>
          </div>

          <div className="flex justify-between mt-4">
            <button
              className="bg-pink-500 text-white px-6 py-2 rounded hover:bg-pink-600"
              onClick={() => navigate("/")}
            >
              Quay về trang chủ
            </button>

            <button
              className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
              onClick={placeOrder}
            >
              Thanh toán
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Checkout;
