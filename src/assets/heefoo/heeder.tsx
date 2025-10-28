import React, { useState, useEffect } from "react";
import { ShoppingCart, Search, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/assets/layouts/menu-cpn/CartContext";
import logo from "@/assets/images/mixiao.png";
import defaultAvatar from "@/assets/images/mixiao.png";

// Định nghĩa kiểu user
type UserType = {
  username: string;
  avatar?: string;
  role: "user" | "admin"; // bắt buộc role
};

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);
  const [user, setUser] = useState<UserType | null>(null);
  const { cartCount } = useCart(); // Bỏ fetchCart vì không cần gọi thủ công
  const API_BASE_URL = "http://localhost:3000"; // Base URL cho avatar
  console.log("🔍 Header: cartCount =", cartCount);

  // Load user từ localStorage khi load trang
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
    console.log("🔍 Header: Loaded user from localStorage =", storedUser);
  }, []);

  // Cập nhật user khi localStorage thay đổi (login/logout)
  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
      console.log("🔍 Header: Storage changed, user =", storedUser);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Lắng nghe sự kiện login từ Login.tsx (fetchCart sẽ được gọi tự động trong CartContext)
  useEffect(() => {
    const handleLogin = (e: Event) => {
      const customEvent = e as CustomEvent<UserType>;
      console.log(
        "🔍 Header: Login event received, detail =",
        customEvent.detail
      );
      setUser(customEvent.detail);
    };
    window.addEventListener("login", handleLogin);
    return () => {
      window.removeEventListener("login", handleLogin);
    };
  }, []);

  // Lắng nghe sự kiện avatarUpdated từ Profile.tsx (ĐÃ THÊM)
  useEffect(() => {
    const handleAvatarUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<UserType>;
      console.log(
        "🔍 Header: Avatar updated event received, detail =",
        customEvent.detail
      );
      setUser(customEvent.detail);
    };
    window.addEventListener("avatarUpdated", handleAvatarUpdate);
    return () => {
      window.removeEventListener("avatarUpdated", handleAvatarUpdate);
    };
  }, []);

  // Ẩn header khi cuộn xuống
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setHidden(currentScroll > lastScroll && currentScroll > 50);
      setLastScroll(currentScroll);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setIsOpen(false);
    console.log("🔍 Header: Logout, user set to null");
  };

  return (
    <header
      className={`w-full bg-gradient-to-r from-[#ffe4ec] to-[#ffd6e8] shadow-sm fixed top-0 left-0 z-50 backdrop-blur-md transition-transform duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="w-full max-w-full px-4 md:px-8 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2 cursor-pointer">
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} // 🩷 quay về đầu trang
            className="flex items-center space-x-2"
          >
            <img
              src={logo}
              alt="Logo quán nước"
              className="h-14 w-14 object-cover rounded-full border border-[#f9a8d4]"
            />
            <span className="text-2xl font-bold text-[#ec4899]">Mixiao</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 font-semibold text-lg">
          {[
            { to: "/", label: "Trang chủ" },
            { to: "/menu", label: "Sản phẩm" },
            { to: "/news", label: "Tin tức" },
            { to: "/about", label: "Về chúng tôi" },
            { to: "/contact", label: "Liên hệ" },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="relative text-gray-700 group transition-all duration-300"
            >
              {/* Văn bản */}
              <span className="group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-pink-400 group-hover:to-pink-600 transition-all duration-300">
                {item.label}
              </span>

              {/* Hiệu ứng gạch chân */}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-pink-400 to-pink-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* Desktop Search + Cart + Login/Avatar */}
        <div className="hidden md:flex items-center space-x-3">
          {/* Search */}
          <div className="flex items-center bg-white/80 rounded-full px-3 py-1 border border-pink-100 shadow-sm box-border">
            <Search className="w-4 h-4 text-[#ec4899]" />
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="bg-transparent outline-none ml-2 text-sm w-48 max-w-full placeholder-gray-400"
            />
          </div>

          {/* Cart */}
          {user && (
            <button
              className="relative p-2 rounded-full bg-white/80 hover:bg-white transition shadow-sm border border-pink-100"
              onClick={() => navigate("/orders")}
            >
              <ShoppingCart className="w-6 h-6 text-[#ec4899]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#ec4899] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                  {cartCount}
                </span>
              )}
            </button>
          )}

          {/* Login hoặc Avatar */}
          {!user ? (
            <Link to="/login">
              <button className="bg-[#ec4884] text-white font-semibold px-4 py-2 rounded-full hover:bg-[#f472b6] transition shadow-sm">
                Đăng nhập
              </button>
            </Link>
          ) : (
            <div className="relative group">
              {/* Avatar (ĐÃ SỬA: Thêm base URL) */}
              <img
                src={
                  user?.avatar ? `${API_BASE_URL}${user.avatar}` : defaultAvatar
                }
                alt={user?.username || "User"}
                className="w-10 h-10 rounded-full border-2 border-[#ec4899] cursor-pointer"
              />

              {/* Dropdown menu */}
              <div className="absolute right-0 mt-2 w-48 opacity-0 invisible group-hover:visible group-hover:opacity-100 flex flex-col bg-white rounded-lg shadow-lg border border-gray-200 transition-all duration-200 z-50 font-sans">
                {/* Header */}
                <div className="px-4 py-2 border-b border-gray-100 text-gray-800 font-semibold text-base">
                  Xin chào, {user?.username}
                </div>

                {/* Profile */}
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-pink-50 transition-colors text-base"
                >
                  Thông tin cá nhân
                </Link>

                {/* Admin page */}
                {user?.role === "admin" && (
                  <button
                    onClick={() => {
                      navigate("/manage-page");
                      setIsUserMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-blue-700 hover:bg-pink-50 transition-colors text-base"
                  >
                    Trang quản lý
                  </button>
                )}

                {/* Orders */}
                <Link
                  to="/orders"
                  className="block px-4 py-2 text-gray-700 hover:bg-pink-50 transition-colors text-base"
                >
                  Đơn hàng của bạn
                </Link>

                {/* Logout */}
                <button
                  onClick={() => {
                    handleLogout();
                    setIsUserMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-pink-50 transition-colors text-base"
                >
                  Đăng xuất
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md bg-white/80 hover:bg-white transition shadow-sm border border-pink-100"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-[#ec4899]" />
            ) : (
              <Menu className="w-6 h-6 text-[#ec4899]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden w-full max-w-full px-4 py-4 bg-pink-50 shadow-md overflow-visible">
          {/* Search */}
          <div className="flex items-center bg-white/80 rounded-full px-3 py-1 border border-pink-100 shadow-sm box-border mb-3">
            <Search className="w-4 h-4 text-[#ec4899]" />
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="bg-transparent outline-none ml-2 text-sm w-full max-w-full placeholder-gray-400"
            />
          </div>

          <nav className="flex flex-col space-y-2 mb-3">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="hover:text-[#ec4899] transition font-medium"
            >
              Trang chủ
            </Link>

            <Link
              to="/menu"
              onClick={() => setIsOpen(false)}
              className="hover:text-[#ec4899] transition font-medium"
            >
              Sản phẩm
            </Link>

            <Link
              to="/news"
              onClick={() => setIsOpen(false)}
              className="hover:text-[#ec4899] transition font-medium"
            >
              Tin tức
            </Link>

            <Link
              to="/about"
              onClick={() => setIsOpen(false)}
              className="hover:text-[#ec4899] transition font-medium"
            >
              Về chúng tôi
            </Link>

            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="hover:text-[#ec4899] transition font-medium"
            >
              Liên hệ
            </Link>
          </nav>

          <div className="flex flex-col space-y-2">
            {user && (
              <div className="flex items-center space-x-3 relative">
                {/* Avatar trigger (ĐÃ SỬA: Thêm base URL) */}
                <img
                  src={
                    user?.avatar
                      ? `${API_BASE_URL}${user.avatar}`
                      : defaultAvatar
                  }
                  alt={user?.username || "User"}
                  className="w-8 h-8 rounded-full border-2 border-[#ec4899] cursor-pointer"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                />

                {/* Dropdown menu, sát bên phải avatar */}
                {isUserMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 flex flex-col bg-white/90 rounded-md shadow-lg border border-pink-100 z-50">
                    {/* Username */}
                    <div className="px-4 py-2 text-gray-800 font-semibold border-b border-gray-100">
                      {user.username}
                    </div>

                    {/* Link profile */}
                    <Link
                      to="/profile"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 block"
                    >
                      Thông tin cá nhân
                    </Link>

                    {/* Link orders */}
                    <Link
                      to="/orders"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 block"
                    >
                      Đơn hàng của bạn
                    </Link>

                    {/* Admin page (chỉ hiện nếu user.role === "admin") */}
                    {user?.role === "admin" && (
                      <button
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-blue-600"
                        onClick={() => {
                          navigate("/manage-page");
                          setIsUserMenuOpen(false);
                        }}
                      >
                        Trang quản lý
                      </button>
                    )}

                    {/* Logout */}
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsUserMenuOpen(false);
                      }}
                      className="px-4 py-2 text-left text-sm text-gray-700 hover:bg-pink-50 block"
                    >
                      Đăng xuất
                    </button>
                  </div>
                )}

                {/* Giỏ hàng */}
                <button className="relative p-2 rounded-full bg-white/80 hover:bg-white transition shadow-sm border border-pink-100 ml-auto">
                  <Link to="/orders">
                    <ShoppingCart className="w-6 h-6 text-[#ec4899]" />
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-[#ec4899] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                        {cartCount}
                      </span>
                    )}
                  </Link>
                </button>
              </div>
            )}

            {!user && (
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <button className="flex-1 bg-[#ec4899] text-white font-semibold px-4 py-2 rounded-full hover:bg-[#f472b6] transition shadow-sm">
                  Đăng nhập
                </button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
