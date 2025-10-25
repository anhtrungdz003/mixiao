import { Button } from "@/components/button";
import { Link } from "react-router-dom";
import Header from "@/assets/heefoo/heeder";
import Footer from "@/assets/heefoo/footer";

export default function PrivacyPolicy() {
  return (
    <>
      <Header />
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-8 pt-[100px] space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-pink-500">
          CHÍNH SÁCH BẢO MẬT - MIXIAO
        </h2>

        <p className="text-gray-700 text-justify mb-6">
          Mixiao cam kết bảo vệ thông tin cá nhân của khách hàng. Thông tin này
          được sử dụng để xử lý đơn hàng, gửi ưu đãi, và cải thiện dịch vụ.
        </p>

        <div className="bg-white shadow-lg rounded-xl p-6">
          <h3 className="text-xl font-semibold text-orange-600 mb-3">
            1. Thu thập thông tin
          </h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
            <li>
              Thông tin cá nhân: Họ tên, số điện thoại, địa chỉ giao hàng.
            </li>
            <li>
              Thông tin thanh toán và đơn hàng khi đặt online hoặc tại cửa hàng.
            </li>
            <li>Thông tin tương tác: email, phản hồi, khảo sát khách hàng.</li>
          </ul>

          <h3 className="text-xl font-semibold text-orange-600 mb-3">
            2. Mục đích sử dụng thông tin
          </h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
            <li>Xử lý đơn hàng và giao hàng chính xác, nhanh chóng.</li>
            <li>
              Gửi thông tin khuyến mãi, ưu đãi đặc biệt và chương trình khách
              hàng thân thiết.
            </li>
            <li>
              Cải thiện chất lượng dịch vụ, trải nghiệm khách hàng và quản lý
              nội bộ.
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-orange-600 mb-3">
            3. Bảo mật thông tin
          </h3>
          <p className="text-gray-700 mb-4">
            Thông tin cá nhân được lưu trữ an toàn, chỉ nhân viên được ủy quyền
            truy cập. Chúng tôi áp dụng các biện pháp kỹ thuật và tổ chức để bảo
            vệ dữ liệu khỏi truy cập trái phép, rò rỉ, hoặc mất mát.
          </p>

          <h3 className="text-xl font-semibold text-orange-600 mb-3">
            4. Quyền của khách hàng
          </h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
            <li>Yêu cầu truy cập, chỉnh sửa hoặc xóa thông tin cá nhân.</li>
            <li>
              Từ chối nhận các thông báo marketing qua email, SMS hoặc điện
              thoại.
            </li>
            <li>
              Liên hệ với Mixiao để giải quyết khiếu nại về quyền riêng tư.
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-orange-600 mb-3">
            5. Lưu ý quan trọng
          </h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
            <li>
              Khách hàng cần đảm bảo thông tin cung cấp là chính xác và cập
              nhật.
            </li>
            <li>
              Mixiao có quyền cập nhật chính sách bảo mật, các thay đổi sẽ được
              thông báo trên website hoặc cửa hàng.
            </li>
            <li>
              Người dùng nên đọc kỹ các điều khoản trước khi sử dụng dịch vụ.
            </li>
          </ul>
        </div>

        <Link to="/">
          <Button variant="default" className="mt-5 w-full md:w-auto">
            Trở về trang chủ
          </Button>
        </Link>
      </div>
      <Footer />
    </>
  );
}
