import React, { useEffect } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { ShoppingCart, Users, BarChart3, PlusCircle } from "lucide-react";

const ManagePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
    }
  }, [navigate]);

  const isMainPage = location.pathname === "/manage-page";

  return (
    <>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-50 via-rose-50 to-white py-6">
        <div className="flex-1 w-full px-4 md:px-6">
          {isMainPage ? (
            <div className="w-full max-w-6xl mx-auto bg-white/90 backdrop-blur-md shadow-lg rounded-3xl p-6 md:p-8 border border-pink-100">
              <h1 className="text-3xl md:text-4xl font-bold text-pink-500 mb-8 text-center">
                Trang quản lý Admin
              </h1>

              <div className="grid grid-cols-2 gap-6">
                {/* Các module */}
                <div
                  onClick={() => navigate("products")}
                  className="cursor-pointer bg-white hover:bg-pink-50 border border-pink-100 rounded-2xl shadow-sm p-6 flex flex-col items-center justify-center transition-all hover:shadow-md"
                >
                  <PlusCircle className="w-10 h-10 text-pink-500 mb-3" />
                  <h3 className="text-lg font-semibold text-gray-800 text-center">
                    Quản lý sản phẩm
                  </h3>
                  <p className="text-gray-500 text-sm mt-1 text-center">
                    Thêm, sửa, xóa sản phẩm
                  </p>
                </div>

                <div
                  onClick={() => navigate("orders")}
                  className="cursor-pointer bg-white hover:bg-pink-50 border border-pink-100 rounded-2xl shadow-sm p-6 flex flex-col items-center justify-center transition-all hover:shadow-md"
                >
                  <ShoppingCart className="w-10 h-10 text-pink-500 mb-3" />
                  <h3 className="text-lg font-semibold text-gray-800 text-center">
                    Quản lý đơn hàng
                  </h3>
                  <p className="text-gray-500 text-sm mt-1 text-center">
                    Theo dõi và xử lý đơn hàng
                  </p>
                </div>

                <div
                  onClick={() => navigate("users")}
                  className="cursor-pointer bg-white hover:bg-pink-50 border border-pink-100 rounded-2xl shadow-sm p-6 flex flex-col items-center justify-center transition-all hover:shadow-md"
                >
                  <Users className="w-10 h-10 text-pink-500 mb-3" />
                  <h3 className="text-lg font-semibold text-gray-800 text-center">
                    Quản lý người dùng
                  </h3>
                  <p className="text-gray-500 text-sm mt-1 text-center">
                    Xem và chỉnh sửa thông tin tài khoản
                  </p>
                </div>

                <div
                  onClick={() => navigate("reports")}
                  className="cursor-pointer bg-white hover:bg-pink-50 border border-pink-100 rounded-2xl shadow-sm p-6 flex flex-col items-center justify-center transition-all hover:shadow-md"
                >
                  <BarChart3 className="w-10 h-10 text-pink-500 mb-3" />
                  <h3 className="text-lg font-semibold text-gray-800 text-center">
                    Báo cáo bán hàng
                  </h3>
                  <p className="text-gray-500 text-sm mt-1 text-center">
                    Thống kê doanh thu và sản phẩm bán chạy
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full max-w-6xl mx-auto bg-white/90 backdrop-blur-md shadow-lg rounded-3xl p-6 md:p-8 border border-pink-100">
              <Outlet />
            </div>
          )}
        </div>

        {/* Button quay về trang chủ */}
        <div className="w-full mt-6 mb-4 flex justify-center px-4 md:px-0">
          <button
            onClick={() => navigate("/")}
            className="px-5 py-3 bg-pink-500 text-white rounded-lg shadow hover:bg-pink-600 transition w-full md:w-auto text-center"
          >
            ← Quay về trang chủ
          </button>
        </div>
      </div>
    </>
  );
};

export default ManagePage;
