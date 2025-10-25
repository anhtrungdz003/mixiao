import React from "react";
import { Link } from "react-router-dom";
import menuHot1 from "@/assets/images/images-home/menuHot1.jpg";
import menuHot2 from "@/assets/images/images-home/menuHot2.jpg";
import menuHot3 from "@/assets/images/images-home/menuHot3.jpg";
import menuHot4 from "@/assets/images/images-home/menuHot4.jpg";
import menuHot5 from "@/assets/images/images-home/menuHot5.jpg";
import menuHot6 from "@/assets/images/images-home/menuHot6.jpg";
import menuHot7 from "@/assets/images/images-home/menuHot7.jpg";
import menuHot8 from "@/assets/images/images-home/menuHot8.jpg";

const menuHotItems = [
  {
    id: 1,
    name: "Trà Sữa Trân Châu Đường Đen",
    price: 38000,
    image: menuHot1,
    category: "Trà",
  },
  {
    id: 2,
    name: "Cà Phê Sữa Đá",
    price: 25000,
    image: menuHot2,
    category: "Cà phê",
  },
  {
    id: 3,
    name: "Nước Ép Cam Tươi",
    price: 32000,
    image: menuHot3,
    category: "Nước ép",
  },
  {
    id: 4,
    name: "Sinh Tố Bơ",
    price: 40000,
    image: menuHot4,
    category: "Nước ép",
  },
  {
    id: 5,
    name: "Trà Chanh Mật Ong",
    price: 28000,
    image: menuHot5,
    category: "Trà",
  },
  {
    id: 6,
    name: "Cà Phê Dừa",
    price: 42000,
    image: menuHot6,
    category: "Cà phê",
  },
  {
    id: 7,
    name: "Nước ép dưa hấu",
    price: 30000,
    image: menuHot7,
    category: "Nước ép",
  },
  {
    id: 8,
    name: "Matcha Đá Xay",
    price: 45000,
    image: menuHot8,
    category: "Trà",
  },
];

const MenuHot: React.FC = () => {
  return (
    <section className="py-16 bg-pink-50 from-pink-50 to-white w-full">
      {/* Tiêu đề */}
      <h2 className="text-4xl font-extrabold text-center text-pink-600 mb-4">
        Menu Hot
      </h2>
      <p className="text-center text-gray-600 mb-10">
        Những thức uống được yêu thích nhất tại Mixiao!
      </p>

      {/* Danh sách sản phẩm full width */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 px-2 md:px-4 w-full">
        {menuHotItems.map((item) => (
          <div
            key={item.id}
            className="relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
          >
            <div className="relative overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-44 md:h-52 object-cover transform group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition duration-500 flex items-end justify-center pb-6">
                <Link
                  to="/menu"
                  className="bg-pink-400 text-white px-8 py-3 rounded-full font-semibold hover:bg-pink-600 transition duration-300 shadow-mdbg-pink-400 !text-white px-8 py-3 rounded-full font-semibold hover:bg-pink-600 transition duration-300 shadow-md inline-block text-center"
                >
                  Mua ngay
                </Link>
              </div>
            </div>

            <div className="p-3 text-center">
              <h3 className="text-base md:text-lg font-semibold text-gray-800 truncate">
                {item.name}
              </h3>
              <p className="text-xs text-gray-500">{item.category}</p>
              <p className="text-pink-600 font-bold mt-1 text-sm md:text-base">
                {item.price.toLocaleString()}đ
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Nút xem thêm */}
      <div className="flex justify-center mt-12">
        <Link
          to="/menu"
          className="bg-pink-400 text-white px-8 py-3 rounded-full font-semibold hover:bg-pink-600 transition duration-300 shadow-mdbg-pink-400 !text-white px-8 py-3 rounded-full font-semibold hover:bg-pink-600 transition duration-300 shadow-md inline-block text-center"
        >
          Xem thêm
        </Link>
      </div>
    </section>
  );
};

export default MenuHot;
