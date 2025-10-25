import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/assets/layouts/menu-cpn/CartContext";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { clearCart, fetchCart } = useCart();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:3000/api/users/login", {
        email,
        password,
      });

      console.log("✅ Login: Response =", res.data); // Log response

      // ✅ Lưu token & user
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // ✅ Đặt token mặc định cho axios
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res.data.token}`;

      // ✅ Phát event login cho Header
      console.log(
        "🔍 Login: Dispatching login event with user =",
        res.data.user
      );
      window.dispatchEvent(new CustomEvent("login", { detail: res.data.user }));

      // ✅ Xóa giỏ cũ & tải lại giỏ hàng mới từ server
      clearCart();
      await fetchCart();

      setSuccess(true);
      navigate("/");
    } catch (err: unknown) {
      console.error("Login error:", err);
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || "Đăng nhập thất bại");
      } else {
        setError("Lỗi không xác định");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-rose-50 to-white">
      <form
        onSubmit={handleSubmit}
        className="bg-white/90 backdrop-blur-md p-10 rounded-3xl shadow-lg w-full max-w-md border border-pink-100"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-pink-500">
          Đăng nhập
        </h2>

        {error && (
          <p className="text-rose-500 text-sm text-center mb-4">{error}</p>
        )}
        {success && (
          <p className="text-green-600 text-sm text-center mb-4">
            Đăng nhập thành công!
          </p>
        )}

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-pink-100 focus:border-pink-300 focus:ring-2 focus:ring-pink-100 rounded-xl px-4 py-3 text-gray-800 outline-none transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Mật khẩu"
            className="w-full border border-pink-100 focus:border-pink-300 focus:ring-2 focus:ring-pink-100 rounded-xl px-4 py-3 text-gray-800 outline-none transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full mt-6 py-3 rounded-xl font-semibold text-white shadow-md transition-all ${
            loading
              ? "bg-pink-300 cursor-not-allowed"
              : "bg-pink-400 hover:bg-pink-500 hover:shadow-lg"
          }`}
        >
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>

        <p className="text-sm text-gray-600 mt-6 text-center">
          Chưa có tài khoản?{" "}
          <Link
            to="/register"
            className="text-pink-500 hover:text-pink-600 font-medium hover:underline"
          >
            Đăng ký ngay
          </Link>
        </p>

        <div className="flex justify-end mt-2">
          <Link
            to="/"
            className="px-3 py-1 text-sm bg-pink-300 text-pink-500 rounded hover:bg-green-300 transition"
          >
            Về trang chủ
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
