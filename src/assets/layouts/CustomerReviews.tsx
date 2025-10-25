import React from "react";
import { Star } from "lucide-react";
import avt1 from "@/assets/images/images-home/avt1.jpg";
import avt2 from "@/assets/images/images-home/avt2.jpg";
import avt3 from "@/assets/images/images-home/avt3.jpg";
import avt4 from "@/assets/images/images-home/avt4.jpg";
import avt5 from "@/assets/images/images-home/avt5.jpg";
import avt6 from "@/assets/images/images-home/avt6.jpg";

interface Review {
  id: number;
  name: string;
  avatar: string;
  rating: number; // số sao 1-5
  content: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Lan Anh",
    avatar: avt1,
    rating: 5,
    content: "Đồ uống ngon, phục vụ nhanh. Rất hài lòng!",
  },
  {
    id: 2,
    name: "Minh Trang",
    avatar: avt2,
    rating: 4,
    content: "Không gian quán đẹp, thích hợp tụ tập bạn bè.",
  },
  {
    id: 3,
    name: "Hương Giang",
    avatar: avt3,
    rating: 5,
    content: "Trà sữa mix đúng vị, topping đầy đủ, giá hợp lý.",
  },
  {
    id: 4,
    name: "Hải Yến",
    avatar: avt4,
    rating: 4,
    content: "Nhân viên thân thiện, sẽ quay lại lần sau.",
  },
  {
    id: 5,
    name: "Thuỳ Linh",
    avatar: avt5,
    rating: 5,
    content: "Sản phẩm đa dạng, đồ uống tươi ngon, thơm mát.",
  },
  {
    id: 6,
    name: "Hồng Ánh",
    avatar: avt6,
    rating: 4,
    content: "Quán đẹp, đồ uống ngon, nhưng hơi đông giờ cao điểm.",
  },
];

const CustomerReviews: React.FC = () => {
  return (
    <section className="py-10 bg-pink-50 ">
      <div className="max-w-6xl mx-auto px-4 md:px-8 mb-20">
        <h2 className="text-3xl font-bold text-pink-600 mb-8 text-center">
          Đánh giá của khách hàng
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-8 mx-auto max-w-[1200px]">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition flex flex-col min-h-[160px]"
            >
              {/* Avatar + tên */}
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="h-12 w-12 rounded-full object-cover border border-pink-200"
                />
                <div>
                  <h3 className="font-semibold text-gray-800">{review.name}</h3>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        size={16}
                        fill={i < review.rating ? "currentColor" : "none"} // fill vàng nếu được đánh giá
                        className={
                          i < review.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }
                        strokeWidth={1.5}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Nội dung */}
              <p className="text-gray-600 text-sm">{review.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
