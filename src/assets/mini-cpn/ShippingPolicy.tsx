import { Button } from "@/components/button";
import { Link } from "react-router-dom";
import Header from "@/assets/heefoo/heeder";
import Footer from "@/assets/heefoo/footer";

export default function ShippingPolicy() {
  return (
    <>
      <Header />
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-8 pt-[100px]">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-pink-500">
          VẬN CHUYỂN & GIAO NHẬN - MIXIAO
        </h2>

        <p className="text-gray-700 mb-6">
          Mixiao giao hàng nhanh chóng tại Vĩnh Phúc và Hà Nội, đảm bảo đồ uống
          luôn tươi mát và giao đúng thời gian. Chúng tôi mong muốn mang đến
          trải nghiệm mua sắm tiện lợi, nhanh chóng và an toàn cho khách hàng.
        </p>

        <h3 className="text-xl font-semibold text-orange-600 mb-3">
          1. Phạm vi giao hàng
        </h3>
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-2xl shadow-lg p-5 border-t-4 border-green-500">
            <h4 className="text-lg font-semibold text-green-600 mb-3">
              Vĩnh Phúc
            </h4>
            <p className="text-gray-600">
              - Giao hàng trong vòng 2h nội thành <br />
              - Miễn phí vận chuyển cho đơn &gt; 120.000đ <br />- Giữ nhiệt đồ
              uống pha sẵn, đảm bảo chất lượng khi đến tay khách hàng
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-5 border-t-4 border-blue-500">
            <h4 className="text-lg font-semibold text-blue-600 mb-3">Hà Nội</h4>
            <p className="text-gray-600">
              - Nội thành: 1 - 3h <br />
              - Ngoại thành: 3 - 5h <br />- Miễn phí vận chuyển cho đơn &gt;
              150.000đ
            </p>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-orange-600 mb-3">
          2. Chi phí vận chuyển
        </h3>
        <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
          <li>
            Đơn hàng dưới mức miễn phí: tính phí theo khoảng cách và trọng
            lượng.
          </li>
          <li>
            Giao gấp trong nội thành: phụ phí 20.000 - 50.000đ tùy khoảng cách.
          </li>
          <li>
            Đơn hàng đông lạnh hoặc cồng kềnh sẽ có phí phụ thu theo quy định.
          </li>
        </ul>

        <h3 className="text-xl font-semibold text-orange-600 mb-3">
          3. Lưu ý quan trọng
        </h3>
        <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
          <li>
            Vui lòng cung cấp địa chỉ và số điện thoại chính xác để đảm bảo giao
            hàng kịp thời.
          </li>
          <li>
            Thời gian giao hàng có thể thay đổi trong các dịp Lễ, Tết hoặc do
            điều kiện thời tiết.
          </li>
          <li>
            Đối với sản phẩm đặc biệt (đồ uống pha sẵn, trân châu, đá xay): giữ
            lạnh ngay sau khi nhận hàng.
          </li>
        </ul>

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
