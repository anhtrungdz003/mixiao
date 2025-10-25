// src/components/BlogReviews.tsx
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import blog1 from "@/assets/images/images-home/blog1.jpg";
import blog2 from "@/assets/images/images-home/blog2.jpg";
import blog3 from "@/assets/images/images-home/blog3.jpg";

interface Post {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  image: string;
}

const posts: Post[] = [
  {
    id: 1,
    title: "Khám phá hương vị trà sữa Mixiao",
    date: "10/10/2025",
    excerpt: "Thưởng thức trà sữa thơm ngon, tươi mát...",
    image: blog1,
  },
  {
    id: 2,
    title: "Cà phê sáng năng lượng",
    date: "08/10/2025",
    excerpt: "Khởi đầu ngày mới với ly cà phê đậm đà...",
    image: blog2,
  },
  {
    id: 3,
    title: "Nước ép trái cây tươi mỗi ngày",
    date: "05/10/2025",
    excerpt: "Bổ sung vitamin với nước ép tươi ngon...",
    image: blog3,
  },
];

const BlogReviews: React.FC = () => {
  return (
    <section className="px-6 md:px-16 py-12 bg-pink-50">
      <h2 className="text-3xl md:text-4xl font-bold text-pink-600 mb-8 text-center mt-10">
        Blog Reviews
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-8 mx-auto max-w-[1200px]">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden flex flex-col"
          >
            {/* Ảnh bài viết */}
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-40 object-cover"
            />

            {/* Nội dung bài viết */}
            <div className="p-4 flex flex-col flex-grow">
              <p className="text-gray-400 text-sm">{post.date}</p>
              <h3 className="text-lg font-semibold text-gray-800 mt-1">
                {post.title}
              </h3>
              <p className="text-gray-600 text-sm mt-2 flex-grow">
                {post.excerpt}
              </p>

              {/* Nút chuyển hướng xuống dưới cùng */}
              <div className="mt-4 flex justify-center">
                <Link
                  to="/news" // 👈 dẫn tới trang news
                  className="w-10 h-10 bg-pink-400 !text-white px-8 py-3 rounded-full font-semibold hover:bg-pink-600 transition duration-300 shadow-md inline-block text-center"
                >
                  <ArrowRight size={20} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Nút Xem tất cả */}
      <div className="mt-8 flex justify-center">
        <Link
          to="/news"
          className="bg-pink-400 !text-white px-8 py-3 rounded-full font-semibold hover:bg-pink-600 transition duration-300 shadow-md inline-block text-center"
        >
          Xem tất cả
        </Link>
      </div>
    </section>
  );
};

export default BlogReviews;
