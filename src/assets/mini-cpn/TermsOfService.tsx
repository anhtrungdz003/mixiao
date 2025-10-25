// TermsOfService.tsx
import { Button } from "@/components/button";
import { Link } from "react-router-dom";
import Header from "@/assets/heefoo/heeder";
import Footer from "@/assets/heefoo/footer";

export default function TermsOfService() {
  return (
    <>
    <Header/>
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-8 pt-[100px]">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-pink-500">
        ĐIỀU KHOẢN SỬ DỤNG - MIXIAO
      </h2>

      <p className="text-gray-700 mb-6">
        Khi sử dụng dịch vụ Mixiao, khách hàng đồng ý tuân thủ các điều khoản
        sau để đảm bảo trải nghiệm tốt nhất:
      </p>

      <h3 className="text-xl md:text-2xl font-semibold text-orange-600 mb-3">
        1. Đặt hàng & thanh toán
      </h3>
      <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
        <li>
          Khách hàng cung cấp thông tin chính xác khi đặt hàng (họ tên, số điện
          thoại, địa chỉ giao hàng).
        </li>
        <li>
          Thanh toán có thể thực hiện trực tiếp tại cửa hàng hoặc online thông
          qua cổng thanh toán được Mixiao hỗ trợ.
        </li>
        <li>
          Mọi đơn hàng được xác nhận qua điện thoại hoặc email trước khi giao.
        </li>
      </ul>

      <h3 className="text-xl md:text-2xl font-semibold text-orange-600 mb-3">
        2. Hủy đơn & đổi/trả
      </h3>
      <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
        <li>Khách hàng có thể hủy đơn trước khi đơn được chuẩn bị.</li>
        <li>
          Đổi trả áp dụng theo chính sách riêng của Mixiao, đảm bảo sản phẩm còn
          nguyên vẹn và trong thời gian quy định.
        </li>
      </ul>

      <h3 className="text-xl md:text-2xl font-semibold text-orange-600 mb-3">
        3. Trách nhiệm khách hàng
      </h3>
      <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
        <li>Tôn trọng quy định tại cửa hàng và các hướng dẫn giao hàng.</li>
        <li>
          Không sử dụng dịch vụ cho mục đích trái pháp luật hoặc gây hại cho
          Mixiao và khách hàng khác.
        </li>
        <li>
          Chịu trách nhiệm về việc bảo mật thông tin tài khoản, mật khẩu, và
          thanh toán.
        </li>
      </ul>

      <h3 className="text-xl md:text-2xl font-semibold text-orange-600 mb-3">
        4. Quyền & trách nhiệm Mixiao
      </h3>
      <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
        <li>Mixiao có quyền từ chối đơn hàng vi phạm điều khoản sử dụng.</li>
        <li>
          Mixiao bảo vệ thông tin cá nhân của khách hàng theo chính sách bảo
          mật.
        </li>
        <li>
          Mixiao có quyền thay đổi điều khoản sử dụng và sẽ thông báo trên
          website/cửa hàng.
        </li>
      </ul>

      <h3 className="text-xl md:text-2xl font-semibold text-orange-600 mb-3">
        5. Tuân thủ pháp luật
      </h3>
      <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
        <li>
          Khách hàng và Mixiao đều phải tuân thủ pháp luật hiện hành tại Việt
          Nam.
        </li>
        <li>
          Mọi tranh chấp sẽ được giải quyết theo pháp luật và tòa án có thẩm
          quyền.
        </li>
      </ul>

      <Link to="/">
        <Button variant="default" className="mt-5 w-full md:w-auto">
          Trở về trang chủ
        </Button>
      </Link>
    </div>
    <Footer/>
    </>
  );
}
