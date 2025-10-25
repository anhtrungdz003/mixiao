import React from "react";
import { Link } from "react-router-dom";
import bannerIn from "@/assets/images/images-home/banner4.jpg"; // ảnh bạn muốn dùng

const BannerIntro: React.FC = () => {
  return (
    <section className="px-6 md:px-16 py-12 bg-pink-50">
      <div className="relative w-full h-[400px] md:h-[500px] px-4 md:px-16 mt-10 overflow-hidden rounded-xl">
        <div className="mx-[40px] h-full relative">
          {/* Background */}
          <img
            src={bannerIn}
            alt="Mixiao"
            className="w-full h-full object-cover rounded-xl"
          />

          {/* Overlay mờ + blur */}
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm rounded-xl"></div>
        </div>
        {/* Nội dung */}
        <div className="absolute inset-0 flex justify-center items-center px-4 md:px-16">
          <div className="bg-white/30 backdrop-blur-md rounded-xl p-4 md:p-10 max-w-full md:max-w-3xl w-full text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-orange-600 mb-3 md:mb-4">
              Khám phá Mixiao
            </h1>
            <p className="text-gray-800 text-sm sm:text-base md:text-lg mb-4 md:mb-6">
              Hành trình từ quán nước đầu tiên năm 2015 đến thương hiệu đồ uống
              hiện đại với nhiều chi nhánh, đối tác uy tín và những thành tựu
              nổi bật.
            </p>
            <Link
              to="/about"
              className="bg-pink-400 !text-white px-8 py-3 rounded-full font-semibold hover:bg-pink-600 transition duration-300 shadow-md inline-block text-center"
            >
              Xem chi tiết
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerIntro;
