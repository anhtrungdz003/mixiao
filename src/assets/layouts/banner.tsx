import React from "react";
import { Link } from "react-router-dom";
import banner from "@/assets/images/images-home/banner.jpg";
import banner1 from "@/assets/images/images-home/banner1.jpg";
import banner2 from "@/assets/images/images-home/banner2.jpg";

const Banner: React.FC = () => {
  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
      {/* Hình nền */}
      <img
        src={banner} // đường dẫn hình banner
        alt="Banner Mixiao"
        className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-105"
      />

      {/* Overlay mờ để chữ nổi bật */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
      {/* Nội dung chính */}
      <div className="absolute inset-0 flex flex-col justify-center items-start px-6 md:px-20 text-white max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg animate-fadeIn">
          Thưởng thức đồ uống tươi mát
        </h1>
        <p className="text-lg md:text-2xl mb-6 text-yellow-100 drop-shadow-md animate-fadeIn delay-200">
          Hương vị tự nhiên, năng lượng mỗi ngày.
        </p>
        <Link
          to="/menu"
          className="bg-pink-400 hover:bg-pink-400 text-whilebg-pink-400 !text-white font-semibold px-6 py-3 rounded-full shadow-lg transition transform hover:scale-105 inline-block text-center font-semibold px-6 py-3 rounded-full shadow-lg transition transform hover:scale-105"
        >
          Xem sản phẩm
        </Link>
      </div>

      {/* Các hình ảnh sản phẩm nhỏ nổi bật */}
      <div className="absolute bottom-4 right-4 flex gap-3 md:gap-6">
        <img
          src={banner1}
          alt="Sản phẩm 1"
          className="h-16 w-16 sm:h-16 sm:w-16 md:h-28 md:w-28 object-cover rounded-lg shadow-lg border border-pink-200 transform transition duration-500 hover:scale-110 hover:rotate-3 hover:shadow-2xl"
        />
        <img
          src={banner2}
          alt="Sản phẩm 2"
          className="h-16 w-16 sm:h-16 sm:w-16 md:h-28 md:w-28 object-cover rounded-lg shadow-lg border border-pink-200 transform transition duration-500 hover:scale-110 hover:rotate-3 hover:shadow-2xl"
        />
      </div>
    </div>
  );
};

export default Banner;
