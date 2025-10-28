import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Success: React.FC = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (countdown <= 0) {
      navigate("/");
    }
  }, [countdown, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-pink-50">
      <div className="p-8 bg-white rounded-xl shadow-lg max-w-md w-full text-center space-y-4 border-2 border-pink-300">
        <h2 className="text-2xl font-bold text-pink-500">
          🎉 Thanh toán thành công!
        </h2>
        <p className="text-pink-700">
          Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ liên hệ bạn sớm.
        </p>
        <p className="text-pink-400">
          Trang sẽ tự động quay về trang chủ sau {countdown} giây...
        </p>
        <button
          className="mt-4 bg-pink-500 text-white px-6 py-2 rounded hover:bg-pink-600"
          onClick={() => navigate("/")}
        >
          Quay về ngay
        </button>
      </div>
    </div>
  );
};

export default Success;
