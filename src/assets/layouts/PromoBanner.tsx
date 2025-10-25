import React from "react";
import { Link } from "react-router-dom";
import promoBg from "@/assets/images/images-home/banner3.jpg"; // đường dẫn ảnh nền

const PromoBanner: React.FC = () => {
  return (
    <section className="px-6 md:px-16 py-12 bg-pink-50">
      <div className="px-4 md:px-16 mx-auto max-w-[1200px]">
        <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-lg">
          {/* Hình nền */}
          <img
            src={promoBg}
            alt="Khuyến mãi Mixiao"
            className="w-full h-full object-cover"
          />

          {/* Overlay mờ */}
          <div className="absolute inset-0 bg-black/30"></div>

          {/* Nội dung chính */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-6 md:px-20 text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">
              Khuyến mãi hấp dẫn tháng này!
            </h1>
            <p className="text-lg md:text-2xl mb-6 drop-shadow-md">
              Nhanh tay đặt ngay để nhận ưu đãi đặc biệt
            </p>
            <Link
              to="/news" // link tới trang khuyến mãi
              className="bg-pink-400 !text-white px-8 py-3 rounded-full font-semibold hover:bg-pink-600 transition duration-300 shadow-md inline-block text-center"
            >
              Xem khuyến mãi
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
