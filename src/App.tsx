import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Homepage from "./assets/pages/homepage";
import Menu from "./assets/pages/menu";
import About from "./assets/pages/about";
import News from "./assets/pages/news";
import Contact from "./assets/pages/contact";
import MyOrders from "./assets/mini-cpn/MyOrders";
import PrivacyPolicy from "@/assets/mini-cpn/PrivacyPolicy";
import TermsOfService from "@/assets/mini-cpn/TermsOfService";
import ShippingPolicy from "@/assets/mini-cpn/ShippingPolicy";
import ReturnPolicy from "@/assets/mini-cpn/ReturnPolicy";
import Login from "@/assets/auth/login";
import Register from "@/assets/auth/register";
import Profile from "@/assets/mini-cpn/Profile";
import ManagePage from "@/assets/admin/ManagePage";
import OrderManager from "@/assets/admin/OrderManager";
import ProductManager from "@/assets/admin/ProductManager";
import ReportManager from "@/assets/admin/ReportManager";
import UserManager from "@/assets/admin/UserManager";
import ScrollToTop from "@/assets/mini-cpn/ScrollToTop";
import { CartProvider } from "@/assets/layouts/menu-cpn/CartContext";

function App() {
  return (
    <CartProvider>
      <Router>
        {/* ScrollToTop phải nằm ngay sau Router */}
        <ScrollToTop />

        {/* Nội dung chính */}
        <div className="flex flex-col min-h-screen bg-pink-50">
          <main className="flex-grow">
            <Routes>
              {/* Trang chính */}
              <Route path="/" element={<Homepage />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/about" element={<About />} />
              <Route path="/news" element={<News />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/orders" element={<MyOrders />} />

              {/* Chính sách & thông tin */}
              <Route path="/chinh-sach-bao-mat" element={<PrivacyPolicy />} />
              <Route path="/dieu-kien" element={<TermsOfService />} />
              <Route path="/van-chuyen" element={<ShippingPolicy />} />
              <Route path="/doi-tra-hoan-tien" element={<ReturnPolicy />} />

              {/* Xác thực & người dùng */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />

              {/* Khu vực quản lý admin */}
              <Route path="/manage-page" element={<ManagePage />}>
                <Route path="products" element={<ProductManager />} />
                <Route path="orders" element={<OrderManager />} />
                <Route path="users" element={<UserManager />} />
                <Route path="reports" element={<ReportManager />} />
              </Route>
            </Routes>
          </main>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
