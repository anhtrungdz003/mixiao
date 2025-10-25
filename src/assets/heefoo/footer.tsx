import React from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/images/mixiao.png";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-pink-100 text-gray-700 relative z-10 ">
      {/* Nội dung chính */}
      <div className="w-full max-w-[1250px] mx-auto px-5 sm:px-8 md:px-12 lg:px-20 py-10 grid grid-cols-1 md:grid-cols-4 gap-10 text-center md:text-left">
        {/* Logo & mô tả */}
        <div>
          <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start gap-3 mb-4 cursor-pointer">
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} // 🩷 quay về đầu trang
              className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start gap-3"
            >
              <img
                src={logo}
                alt="Logo Mixiao"
                className="h-14 w-14 object-cover rounded-full border border-[#f9a8d4]"
              />
              <h2 className="text-2xl font-bold text-pink-600">Mixiao</h2>
            </Link>
          </div>

          <p className="text-sm leading-relaxed text-gray-600">
            Thưởng thức đồ uống tươi mát, hương vị tự nhiên — mang lại cảm giác
            thư giãn và năng lượng mỗi ngày.
          </p>

          {/* Mạng xã hội */}
          <div className="flex justify-center md:justify-start gap-3 mt-6">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-pink-500 p-2 rounded-full hover:bg-pink-400 transition"
            >
              <Facebook color="white" size={18} />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-pink-500 p-2 rounded-full hover:bg-pink-400 transition"
            >
              <Instagram color="white" size={18} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-pink-500 p-2 rounded-full hover:bg-pink-400 transition"
            >
              <Twitter color="white" size={18} />
            </a>
          </div>
        </div>

        {/* Liên kết nhanh */}
        <div>
          <h3 className="text-lg font-semibold text-pink-600 mb-3">
            Liên kết nhanh
          </h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-pink-500">
                Trang chủ
              </Link>
            </li>
            <li>
              <Link to="/menu" className="hover:text-pink-500">
                Sản phẩm
              </Link>
            </li>
            <li>
              <Link to="/news" className="hover:text-pink-500">
                Tin tức
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-pink-500">
                Về chúng tôi
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-pink-500">
                Liên hệ
              </Link>
            </li>
          </ul>
        </div>

        {/* Chính sách */}
        <div>
          <h3 className="text-lg font-semibold text-pink-600 mb-3">
            Theo dõi & Chính sách
          </h3>
          <ul className="space-y-2">
            <li>
              <Link to="/chinh-sach-bao-mat" className="hover:text-gray-900">
                Chính sách bảo mật
              </Link>
            </li>
            <li>
              <Link to="/dieu-kien" className="hover:text-gray-900">
                Điều khoản sử dụng
              </Link>
            </li>
            <li>
              <Link to="/van-chuyen" className="hover:text-gray-900">
                Vận chuyển & giao nhận
              </Link>
            </li>
            <li>
              <Link to="/doi-tra-hoan-tien" className="hover:text-gray-900">
                Đổi trả & hoàn tiền
              </Link>
            </li>
          </ul>
        </div>

        {/* Liên hệ */}
        <div>
          <h3 className="text-lg font-semibold text-pink-600 mb-3">Liên hệ</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center justify-center md:justify-start gap-2 flex-wrap">
              <MapPin size={18} /> Vĩnh Tường, Vĩnh Phúc
            </li>
            <li className="flex items-center justify-center md:justify-start gap-2 flex-wrap">
              <Phone size={18} /> 0366.559.916
            </li>
            <li className="flex items-center justify-center md:justify-start gap-2 flex-wrap">
              <Mail size={18} /> contact@2003mixiao.vn
            </li>
            <li className="flex items-center justify-center md:justify-start gap-2 flex-wrap">
              Nơi cấp: Sở KH & Đầu tư Tỉnh Vĩnh Phúc
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-pink-200 mt-5 py-4 px-4 text-center text-sm text-gray-500">
        © 2025 Mixiao. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
