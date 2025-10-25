import React from "react";

const timeline = [
  { year: "2015", event: "Khởi nghiệp quán đầu tiên tại Hà Nội" },
  { year: "2018", event: "Mở rộng ra 5 chi nhánh" },
  { year: "2020", event: "Ra mắt menu mùa hè mới" },
  { year: "2023", event: "Đạt giải thưởng ẩm thực Việt" },
];

const achievements = [
  { label: "Chi nhánh", number: 15 },
  { label: "Khách hàng", number: 5000 },
  { label: "Giải thưởng", number: 8 },
  { label: "Sản phẩm", number: 120 },
];

const AboutHistory: React.FC = () => {
  return (
    <section className="py-16 px-4 md:px-8">
      {" "}
      {/* Timeline */}{" "}
      <div className="max-w-[1200px] mx-auto mb-12">
        {" "}
        <h2 className="text-3xl font-bold text-pink-600 mb-8 text-center">
          {" "}
          Lịch sử hình thành{" "}
        </h2>{" "}
        <div className="relative border-l-2 border-pink-400 ml-4">
          {" "}
          {timeline.map((item, idx) => (
            <div key={idx} className="mb-10 ml-6">
              {" "}
              <div className="absolute w-4 h-4 bg-pink-600 rounded-full -left-2 top-1.5"></div>{" "}
              <p className="font-semibold text-gray-800">{item.year}</p>{" "}
              <p className="text-gray-600">{item.event}</p>{" "}
            </div>
          ))}{" "}
        </div>{" "}
      </div>{" "}
      {/* Achievements */}{" "}
      <div className="max-w-[1200px] mx-auto">
        {" "}
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          {" "}
          Thành tựu nổi bật{" "}
        </h3>{" "}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {" "}
          {achievements.map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow-sm">
              {" "}
              <p className="text-3xl font-bold text-pink-600">
                {item.number}+
              </p>{" "}
              <p className="text-gray-700 mt-2">{item.label}</p>{" "}
            </div>
          ))}{" "}
        </div>{" "}
      </div>{" "}
    </section>
  );
};
export default AboutHistory;
