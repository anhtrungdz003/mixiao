import { useState } from "react";
import news1 from "@/assets/images/images-news/news1.jpg";
import news2 from "@/assets/images/images-news/news2.jpg";
import news3 from "@/assets/images/images-news/news3.jpg";
import news4 from "@/assets/images/images-news/news4.jpg";
import news5 from "@/assets/images/images-news/news5.jpg";
import news6 from "@/assets/images/images-news/news6.jpg";
import news7 from "@/assets/images/images-news/news7.jpg";
import news8 from "@/assets/images/images-news/news8.jpg";
import news9 from "@/assets/images/images-news/news9.jpg";
import news10 from "@/assets/images/images-news/news10.jpg";
import news11 from "@/assets/images/images-news/news11.jpg";
import news12 from "@/assets/images/images-news/news12.jpg";
import news13 from "@/assets/images/images-news/news13.jpg";
import news14 from "@/assets/images/images-news/news14.jpg";
import news15 from "@/assets/images/images-news/news15.jpg";
import news16 from "@/assets/images/images-news/news16.jpg";
import news17 from "@/assets/images/images-news/news17.jpg";
import news18 from "@/assets/images/images-news/news18.jpg";
import news19 from "@/assets/images/images-news/news19.jpg";
import news20 from "@/assets/images/images-news/news20.jpg";
import news21 from "@/assets/images/images-news/news21.jpg";
import news22 from "@/assets/images/images-news/news22.jpg";
import news23 from "@/assets/images/images-news/news23.jpg";
import news24 from "@/assets/images/images-news/news24.jpg";
import news25 from "@/assets/images/images-news/news25.jpg";
import news26 from "@/assets/images/images-news/news26.jpg";
import news27 from "@/assets/images/images-news/news27.jpg";
import news28 from "@/assets/images/images-news/news28.jpg";
import news29 from "@/assets/images/images-news/news29.jpg";
import news30 from "@/assets/images/images-news/news30.jpg";
import news31 from "@/assets/images/images-news/news31.jpg";
import news32 from "@/assets/images/images-news/news32.jpg";
import news33 from "@/assets/images/images-news/news33.jpg";
import news34 from "@/assets/images/images-news/news34.jpg";
import news35 from "@/assets/images/images-news/news35.jpg";
import news36 from "@/assets/images/images-news/news36.jpg";
import news37 from "@/assets/images/images-news/news37.jpg";
import news38 from "@/assets/images/images-news/news38.jpg";
import news39 from "@/assets/images/images-news/news39.jpg";
import news40 from "@/assets/images/images-news/news40.jpg";

const newsData = [
  {
    id: 1,
    category: "Tin tức",
    status: "Mới",
    title: "Mixiao khai trương chi nhánh mới tại Hà Nội",
    image: news1,
    content:
      "Mixiao chính thức mở rộng thêm một chi nhánh tại trung tâm Hà Nội, mang đến không gian hiện đại và menu đồ uống đa dạng.",
  },
  {
    id: 2,
    category: "Sự kiện",
    status: "Khuyến mãi",
    title: "Mixiao ưu đãi lớn nhân dịp kỷ niệm 5 năm thành lập",
    image: news2,
    content:
      "Giảm giá 20% toàn menu và tặng thêm topping cho khách hàng trong tuần lễ kỷ niệm 5 năm Mixiao.",
  },
  {
    id: 3,
    category: "Bài viết",
    status: "Nổi bật",
    title: "Hành trình phát triển của Mixiao qua từng năm",
    image: news3,
    content:
      "Từ một quán nước nhỏ, Mixiao đã trở thành thương hiệu quen thuộc với giới trẻ yêu đồ uống tại Việt Nam.",
  },
  {
    id: 4,
    category: "Tin tức",
    status: "Nổi bật",
    title: "Mixiao ra mắt dòng trà sữa ít đường tốt cho sức khỏe",
    image: news4,
    content:
      "Đáp ứng xu hướng sống lành mạnh, Mixiao cho ra mắt các loại trà sữa ít đường, thanh mát và tự nhiên.",
  },
  {
    id: 5,
    category: "Sự kiện",
    status: "Mới",
    title: "Workshop pha chế tại Mixiao Đà Nẵng thu hút đông đảo giới trẻ",
    image: news5,
    content:
      "Buổi workshop giúp khách hàng trải nghiệm quy trình pha chế đồ uống và hiểu thêm về nguyên liệu tự nhiên của Mixiao.",
  },
  {
    id: 6,
    category: "Bài viết",
    status: "Khuyến mãi",
    title: "Top 5 món nước bán chạy nhất tại Mixiao",
    image: news6,
    content:
      "Trà sữa Matcha và cà phê sữa đá vẫn là hai món được yêu thích nhất trong menu Mixiao tháng 10.",
  },
  {
    id: 7,
    category: "Tin tức",
    status: "Mới",
    title: "Mixiao triển khai thanh toán QR tiện lợi trên toàn hệ thống",
    image: news7,
    content:
      "Giờ đây bạn có thể thanh toán dễ dàng bằng mã QR tại tất cả cửa hàng Mixiao trên toàn quốc.",
  },
  {
    id: 8,
    category: "Sự kiện",
    status: "Nổi bật",
    title: "Mixiao đồng hành cùng lễ hội ẩm thực đường phố Việt Nam 2025",
    image: news8,
    content:
      "Mixiao mang đến hàng trăm ly trà sữa miễn phí và hoạt động vui chơi cho giới trẻ tại lễ hội.",
  },
  {
    id: 9,
    category: "Bài viết",
    status: "Mới",
    title: "Cách Mixiao chọn nguyên liệu tự nhiên cho từng món đồ uống",
    image: news9,
    content:
      "Từ lá trà, sữa tươi đến trái cây, tất cả đều được Mixiao chọn lọc kỹ lưỡng từ các nhà cung cấp uy tín.",
  },
  {
    id: 10,
    category: "Tin tức",
    status: "Khuyến mãi",
    title: "Mixiao tặng topping miễn phí cho đơn hàng online đầu tiên",
    image: news10,
    content:
      "Chương trình áp dụng khi khách hàng đặt hàng qua ứng dụng Mixiao App hoặc website chính thức.",
  },
  {
    id: 11,
    category: "Bài viết",
    status: "Nổi bật",
    title: "Câu chuyện đằng sau ly trà sữa Mixiao đậm vị hạnh phúc",
    image: news11,
    content:
      "Mixiao luôn hướng tới việc tạo ra những ly đồ uống không chỉ ngon mà còn gắn kết mọi người.",
  },
  {
    id: 12,
    category: "Sự kiện",
    status: "Mới",
    title: "Mixiao tổ chức cuộc thi ảnh 'Check-in Mixiao - Nhận quà cực chất'",
    image: news12,
    content:
      "Khách hàng tham gia check-in tại cửa hàng Mixiao có cơ hội nhận được voucher trị giá 500.000đ.",
  },
  {
    id: 13,
    category: "Tin tức",
    status: "Khuyến mãi",
    title: "Giảm 10% khi mang ly cá nhân đến Mixiao",
    image: news13,
    content:
      "Mixiao khuyến khích khách hàng bảo vệ môi trường bằng cách sử dụng ly cá nhân khi mua đồ uống.",
  },
  {
    id: 14,
    category: "Bài viết",
    status: "Mới",
    title: "Những công thức độc quyền làm nên hương vị Mixiao",
    image: news14,
    content:
      "Các công thức đặc biệt được Mixiao nghiên cứu và phát triển để giữ trọn hương vị nguyên bản.",
  },
  {
    id: 15,
    category: "Tin tức",
    status: "Nổi bật",
    title: "Mixiao khai trương cửa hàng thứ 20 tại TP.HCM",
    image: news15,
    content:
      "Cửa hàng mới nằm tại trung tâm quận 1, hứa hẹn là điểm đến yêu thích của giới trẻ Sài Gòn.",
  },
  {
    id: 16,
    category: "Sự kiện",
    status: "Khuyến mãi",
    title: "Mixiao đồng hành cùng chương trình 'Uống sạch sống xanh'",
    image: news16,
    content:
      "Sự kiện khuyến khích giới trẻ dùng đồ uống thân thiện môi trường và giảm thiểu rác thải nhựa.",
  },
  {
    id: 17,
    category: "Bài viết",
    status: "Nổi bật",
    title: "Bí quyết pha chế trà sữa ngon như Mixiao tại nhà",
    image: news17,
    content:
      "Hướng dẫn chi tiết để bạn có thể tự tay pha một ly trà sữa thơm ngon chuẩn vị Mixiao.",
  },
  {
    id: 18,
    category: "Tin tức",
    status: "Mới",
    title: "Mixiao mở lớp đào tạo nhân viên pha chế chuyên nghiệp",
    image: news18,
    content:
      "Mixiao tổ chức lớp học dành cho nhân viên mới để nâng cao kỹ năng pha chế và phục vụ khách hàng.",
  },
  {
    id: 19,
    category: "Bài viết",
    status: "Khuyến mãi",
    title: "Top đồ uống mới ra mắt được yêu thích tại Mixiao",
    image: news19,
    content:
      "Trà xoài kem cheese và cà phê sữa muối đang là hai món bán chạy nhất tháng này.",
  },
  {
    id: 20,
    category: "Sự kiện",
    status: "Nổi bật",
    title: "Mixiao đồng tài trợ cuộc thi pha chế sinh viên 2025",
    image: news20,
    content:
      "Cuộc thi nhằm tìm kiếm tài năng trẻ trong lĩnh vực pha chế đồ uống sáng tạo.",
  },
  {
    id: 21,
    category: "Tin tức",
    status: "Mới",
    title: "Mixiao mở rộng dịch vụ giao hàng toàn quốc",
    image: news21,
    content:
      "Khách hàng ở mọi tỉnh thành nay có thể đặt đồ uống Mixiao thông qua ứng dụng giao hàng đối tác.",
  },
  {
    id: 22,
    category: "Bài viết",
    status: "Nổi bật",
    title: "5 lý do khiến trà sữa Mixiao được yêu thích nhất năm 2025",
    image: news22,
    content:
      "Từ hương vị độc đáo, nguyên liệu tự nhiên đến dịch vụ tận tâm, Mixiao luôn giữ vững vị thế top đầu.",
  },
  {
    id: 23,
    category: "Sự kiện",
    status: "Khuyến mãi",
    title: "Mixiao giảm giá 15% combo sinh nhật tháng 11",
    image: news23,
    content:
      "Khách hàng có sinh nhật trong tháng 11 sẽ được giảm giá khi mua combo đặc biệt tại tất cả chi nhánh Mixiao.",
  },
  {
    id: 24,
    category: "Tin tức",
    status: "Nổi bật",
    title: "Mixiao nhận giải thưởng 'Thương hiệu đồ uống sáng tạo 2025'",
    image: news24,
    content:
      "Mixiao được vinh danh tại lễ trao giải ẩm thực quốc gia vì đóng góp trong đổi mới ngành đồ uống.",
  },
  {
    id: 25,
    category: "Bài viết",
    status: "Mới",
    title: "Câu chuyện thương hiệu: Hành trình từ Hà Nội đến toàn quốc",
    image: news25,
    content:
      "Mixiao bắt đầu từ một quán nhỏ, nhưng với tâm huyết và chất lượng, thương hiệu nhanh chóng lan tỏa khắp Việt Nam.",
  },
  {
    id: 26,
    category: "Sự kiện",
    status: "Nổi bật",
    title: "Mixiao góp mặt tại Hội chợ Ẩm thực Châu Á 2025",
    image: news26,
    content:
      "Mixiao giới thiệu văn hóa trà sữa Việt Nam đến bạn bè quốc tế thông qua gian hàng đặc sắc.",
  },
  {
    id: 27,
    category: "Tin tức",
    status: "Khuyến mãi",
    title: "Freeship toàn quốc cho đơn từ 100.000đ",
    image: news27,
    content:
      "Mixiao áp dụng chương trình freeship đặc biệt cho mọi khách hàng đặt hàng online trong tháng 12.",
  },
  {
    id: 28,
    category: "Bài viết",
    status: "Nổi bật",
    title: "Mixiao và triết lý 'Mỗi ly nước – Một nụ cười'",
    image: news28,
    content:
      "Không chỉ bán đồ uống, Mixiao mong muốn mang đến niềm vui và năng lượng tích cực cho mọi khách hàng.",
  },
  {
    id: 29,
    category: "Sự kiện",
    status: "Mới",
    title: "Lễ ra mắt dòng sản phẩm Smoothie mới tại Mixiao",
    image: news29,
    content:
      "Mixiao giới thiệu 5 hương vị smoothie mới, kết hợp trái cây tươi và sữa chua tự nhiên.",
  },
  {
    id: 30,
    category: "Tin tức",
    status: "Nổi bật",
    title: "Mixiao đạt chứng nhận vệ sinh an toàn thực phẩm 5 sao",
    image: news30,
    content:
      "Các sản phẩm của Mixiao được kiểm định nghiêm ngặt, đảm bảo chất lượng và an toàn cho người dùng.",
  },
  {
    id: 31,
    category: "Bài viết",
    status: "Khuyến mãi",
    title: "Tặng voucher 50.000đ cho khách hàng thành viên mới",
    image: news31,
    content:
      "Tham gia chương trình thành viên Mixiao Rewards để nhận nhiều ưu đãi hấp dẫn mỗi tháng.",
  },
  {
    id: 32,
    category: "Sự kiện",
    status: "Nổi bật",
    title: "Mixiao đồng hành cùng sự kiện 'Chạy vì môi trường xanh'",
    image: news32,
    content:
      "Mixiao tài trợ nước uống cho hơn 5.000 người tham gia chương trình tại Hà Nội và TP.HCM.",
  },
  {
    id: 33,
    category: "Tin tức",
    status: "Mới",
    title: "Mixiao ra mắt website mới thân thiện hơn",
    image: news33,
    content:
      "Giao diện website Mixiao.vn được cải tiến giúp khách hàng đặt hàng nhanh chóng và tiện lợi hơn.",
  },
  {
    id: 34,
    category: "Bài viết",
    status: "Nổi bật",
    title: "Trà sữa ít đường – xu hướng đồ uống của năm",
    image: news34,
    content:
      "Mixiao tiên phong đưa các dòng sản phẩm healthy, đáp ứng nhu cầu sống lành mạnh của giới trẻ.",
  },
  {
    id: 35,
    category: "Sự kiện",
    status: "Khuyến mãi",
    title: "Mixiao phát hành thẻ thành viên ưu đãi đặc biệt",
    image: news35,
    content:
      "Chủ thẻ Mixiao Card được giảm 10% cho mọi đơn hàng và tích điểm đổi quà.",
  },
  {
    id: 36,
    category: "Tin tức",
    status: "Nổi bật",
    title:
      "Mixiao được truyền hình quốc gia phỏng vấn về hành trình phát triển",
    image: news36,
    content:
      "Buổi phỏng vấn xoay quanh triết lý kinh doanh và tầm nhìn phát triển bền vững của Mixiao.",
  },
  {
    id: 37,
    category: "Bài viết",
    status: "Mới",
    title: "Cách Mixiao đào tạo nhân viên mang lại dịch vụ tốt nhất",
    image: news37,
    content:
      "Từ kỹ năng pha chế đến giao tiếp, mọi nhân viên đều được huấn luyện kỹ lưỡng để phục vụ khách hàng tốt nhất.",
  },
  {
    id: 38,
    category: "Sự kiện",
    status: "Nổi bật",
    title: "Mixiao đồng tài trợ lễ hội 'Ngày hội Trà sữa Việt Nam'",
    image: news38,
    content:
      "Mixiao giới thiệu hàng chục loại đồ uống độc đáo và tổ chức nhiều trò chơi thú vị cho khách tham dự.",
  },
  {
    id: 39,
    category: "Tin tức",
    status: "Khuyến mãi",
    title: "Giờ vàng 14h–16h: giảm ngay 20% toàn menu",
    image: news39,
    content:
      "Mixiao mang đến chương trình giờ vàng khuyến mãi đặc biệt cho khách hàng mua trực tiếp tại quán.",
  },
  {
    id: 40,
    category: "Bài viết",
    status: "Nổi bật",
    title: "Trà xanh Nhật Bản – hương vị thanh khiết trong từng giọt Mixiao",
    image: news40,
    content:
      "Mixiao kết hợp matcha nguyên chất Nhật Bản để mang lại hương vị tinh tế và đậm đà cho người yêu trà.",
  },
];
// component
export default function NewsList() {
  const [activeStatus, setActiveStatus] = useState("Tất cả");
  const [activeCategory, setActiveCategory] = useState("Tin tức");
  const [currentPage, setCurrentPage] = useState(1);

  const statuses = ["Tất cả", "Mới", "Nổi bật", "Khuyến mãi"];
  const categories = ["Sự kiện", "Tin tức", "Bài viết"];

  //  Lọc dữ liệu theo category + status
  const filteredArticles = newsData.filter((a) => {
    const matchStatus = activeStatus === "Tất cả" || a.status === activeStatus;
    const matchCategory = a.category === activeCategory;
    return matchStatus && matchCategory;
  });

  const itemsPerPage = 4;
  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // --- JSX ---
  return (
    
    <div className="max-w-[1200px] mx-auto px-2 sm:px-4 lg:px-6 mt-28 mb-32">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Bộ lọc danh mục - bên trái */}
        <div className="md:w-1/5 w-full mb-6 md:mb-0">
          <div className="bg-white rounded-xl shadow-md p-4 border">
            <h2 className="text-lg font-semibold text-pink-600 mb-4 text-center md:text-left">
              Danh mục
            </h2>
            <div className="flex flex-col gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`px-4 py-2 rounded-lg border text-sm font-medium transition ${
                    activeCategory === cat
                      ? "bg-pink-500 text-white border-pink-500"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-pink-50"
                  }`}
                  onClick={() => {
                    setActiveCategory(cat);
                    setCurrentPage(1);
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Danh sách bài viết - bên phải */}
        <div className="flex-1">
          {/* Bộ lọc trạng thái */}
          <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-6">
            {statuses.map((status) => (
              <button
                key={status}
                className={`px-4 py-2 rounded-full text-sm sm:text-base transition ${
                  activeStatus === status
                    ? "bg-blue-500 text-white shadow"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
                onClick={() => {
                  setActiveStatus(status);
                  setCurrentPage(1);
                }}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Danh sách bài viết */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {paginatedArticles.length > 0 ? (
              paginatedArticles.map((article) => (
                <div
                  key={article.id}
                  className="border rounded-xl shadow-sm overflow-hidden bg-white hover:shadow-md transition"
                >
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 sm:h-56 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg sm:text-xl text-gray-800 mb-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {article.content}
                    </p>
                    <div className="mt-3 flex items-center justify-between text-xs">
                      <span className="px-2 py-1 bg-gray-100 rounded">
                        {article.category}
                      </span>
                      <span
                        className={`px-2 py-1 rounded ${
                          article.status === "Mới"
                            ? "bg-green-100 text-green-600"
                            : article.status === "Khuyến mãi"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-blue-100 text-blue-600"
                        }`}
                      >
                        {article.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">
                Không có bài viết nào.
              </p>
            )}
          </div>

          {/* Phân trang */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8 gap-2 flex-wrap">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded ${
                      currentPage === page
                        ? "bg-pink-500 text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
