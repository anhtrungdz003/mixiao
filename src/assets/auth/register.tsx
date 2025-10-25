import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await axios.post("http://localhost:3000/api/users/register", {
        username,
        email,
        password,
      });
      setSuccess(true);
      setUsername("");
      setEmail("");
      setPassword("");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.error || "Tài khoản hoặc mật khẩu đã tồn tại"
        );
      } else {
        setError("Đã xảy ra lỗi không xác định");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-pink-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-3xl shadow-lg w-full max-w-md border border-pink-100"
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-pink-500">
          Đăng ký tài khoản
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
        )}
        {success && (
          <p className="text-green-600 text-sm mb-3 text-center">
            Đăng ký thành công! Hãy đăng nhập.
          </p>
        )}

        <input
          type="text"
          placeholder="Tên người dùng"
          className="w-full border border-gray-300 focus:border-pink-200 focus:ring-2 focus:ring-pink-100 rounded-lg px-4 py-2.5 mb-4 outline-none transition"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border border-gray-300 focus:border-pink-200 focus:ring-2 focus:ring-pink-100 rounded-lg px-4 py-2.5 mb-4 outline-none transition"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Mật khẩu"
          className="w-full border border-gray-300 focus:border-pink-200 focus:ring-2 focus:ring-pink-100 rounded-lg px-4 py-2.5 mb-6 outline-none transition"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-pink-400 hover:bg-pink-500 text-white font-semibold py-2.5 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-70"
        >
          {loading ? "Đang đăng ký..." : "Đăng ký"}
        </button>

        <div className="flex justify-end mt-2">
          <Link
            to="/"
            className="px-3 py-1 text-sm bg-pink-200 text-pink-500 rounded hover:bg-pink-300 transition"
          >
            Về trang chủ
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
