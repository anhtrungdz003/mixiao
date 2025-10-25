import React from "react";
import { useNavigate } from "react-router-dom";

const PromoSection: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/news"); // chuyển sang trang News
  };
  return (
    <section className="bg-primary/10 py-8 px-6 text-center rounded-2xl mx-4 my-8">
      <h3 className="text-2xl font-bold text-pink-500 mb-2">
        🎉 Ưu đãi đặc biệt tháng này!
      </h3>
      <p className="text-gray-700 mb-4">
        Mua 2 tặng 1 cho tất cả đồ uống vào cuối tuần.
      </p>
      <button
        onClick={handleClick}
        className="bg-pink-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-pink-600 transition"
      >
        Xem chi tiết
      </button>
    </section>
  );
};

export default PromoSection;
