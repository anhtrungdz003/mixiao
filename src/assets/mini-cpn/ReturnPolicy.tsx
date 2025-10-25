import { Button } from "@/components/button";
import { Link } from "react-router-dom";
import Header from "@/assets/heefoo/heeder";
import Footer from "@/assets/heefoo/footer";

export default function ReturnPolicy() {
  return (
    <>
      <Header />
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-8 pt-[100px]">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-pink-500">
          ĐỔI TRẢ & HOÀN TIỀN - MIXIAO
        </h2>

        <p className="text-gray-700 mb-6">
          Mixiao cam kết đổi trả và hoàn tiền nếu sản phẩm hư hỏng, giao nhầm,
          hoặc không đạt chất lượng cam kết. Chúng tôi mong muốn mang đến trải
          nghiệm mua sắm an toàn và tiện lợi cho khách hàng.
        </p>

        <h3 className="text-xl font-semibold text-orange-600 mb-3">
          1. Điều kiện đổi trả
        </h3>
        <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
          <li>Thời gian đổi trả: trong vòng 24h kể từ khi nhận hàng.</li>
          <li>
            Sản phẩm còn nguyên vẹn, bao bì không bị mở hoặc hư hỏng do khách
            hàng.
          </li>
          <li>Hàng giao nhầm hoặc bị lỗi kỹ thuật từ phía Mixiao.</li>
          <li>
            Hoàn tiền sẽ được thực hiện qua phương thức thanh toán ban đầu.
          </li>
        </ul>

        <h3 className="text-xl font-semibold text-orange-600 mb-3">
          2. Hướng dẫn đổi trả
        </h3>
        <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
          <li>
            Liên hệ hotline: <strong>0366.559.916</strong> hoặc email{" "}
            <strong>contact@2003mixiao.vn</strong>.
          </li>
          <li>
            Thông báo lý do đổi trả và cung cấp hình ảnh sản phẩm nếu cần.
          </li>
          <li>
            Nhân viên Mixiao hướng dẫn quy trình đổi trả hoặc hoàn tiền nhanh
            chóng.
          </li>
        </ul>

        <h3 className="text-xl font-semibold text-orange-600 mb-3">
          3. Quy định đặc biệt
        </h3>
        <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
          <li>
            Sản phẩm khuyến mãi, quà tặng đi kèm sẽ được tính riêng trong trường
            hợp đổi trả.
          </li>
          <li>
            Đơn hàng đã giao nhưng khách hàng không nhận sẽ bị tính phí vận
            chuyển theo quy định.
          </li>
          <li>
            Một số sản phẩm tươi, đông lạnh sẽ áp dụng điều kiện bảo quản riêng
            khi đổi trả.
          </li>
        </ul>

        <h3 className="text-xl font-semibold text-orange-600 mb-3">
          4. Thời gian xử lý
        </h3>
        <p className="text-gray-700 mb-4">
          Thời gian xử lý đổi trả thường từ 1-3 ngày làm việc kể từ khi Mixiao
          nhận được sản phẩm. Khách hàng sẽ được thông báo qua email hoặc điện
          thoại về tình trạng hoàn tiền hoặc gửi sản phẩm thay thế.
        </p>

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
