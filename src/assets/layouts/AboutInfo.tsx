import React from "react";
import avt7 from "@/assets/images/images-about/avt7.jpg";
import avt8 from "@/assets/images/images-about/avt8.jpg";
import avt9 from "@/assets/images/images-about/avt9.jpg";
import avt10 from "@/assets/images/images-about/avt10.jpg";
import Info from "@/assets/images/images-about/Info.jpg";

const teamMembers = [
  {
    name: "Nguyễn Văn A",
    role: "CEO",
    image: avt7,
  },
  { name: "Trần Thị B", role: "CTO", image: avt8 },
  {
    name: "Lê Văn C",
    role: "Marketing Manager",
    image: avt9,
  },
  {
    name: "Phạm Thị D",
    role: "Designer",
    image: avt10,
  },
];

const AboutInfo: React.FC = () => {
  return (
    <section >
      {/* Giới thiệu Mixiao */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-16 flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold text-pink-600 mb-6">
            Giới thiệu về Mixiao
          </h2>
          <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-4">
            Mixiao là thương hiệu đồ uống hiện đại, luôn mang đến những trải
            nghiệm tuyệt vời cho khách hàng. Chúng tôi kết hợp nguyên liệu tự
            nhiên, công thức độc quyền và sự sáng tạo để tạo ra những ly trà
            sữa, smoothie và cà phê tuyệt hảo.
          </p>
          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
            Với không gian thân thiện và đội ngũ nhân viên chuyên nghiệp, Mixiao
            hướng tới việc mang đến niềm vui và hạnh phúc trong từng trải nghiệm
            thưởng thức đồ uống cho mọi khách hàng.
          </p>
        </div>
        <div className="md:w-1/2">
          <img
            src= {Info}
            alt="Giới thiệu Mixiao"
            className="w-full h-auto rounded-xl shadow-lg object-cover"
          />
        </div>
      </div>
      {/* Sứ mệnh & Tầm nhìn */}
      <div className="w-full px-4 sm:px-6 md:px-8 py-12 text-center">
        <h3 className="text-2xl sm:text-3xl font-bold text-pink-600 mb-3">
          Sứ mệnh & Tầm nhìn
        </h3>
        <p className="text-gray-700 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Chúng tôi mang đến trải nghiệm đồ uống chất lượng cao, sáng tạo và
          phục vụ tận tâm. Giá trị cốt lõi: Chất lượng – Sáng tạo – Khách hàng
          là trung tâm.
        </p>
      </div>

      {/* Đội ngũ */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 mb-16">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Đội ngũ của chúng tôi
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className="text-center border rounded-lg p-4 shadow-sm"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
              />
              <h4 className="font-semibold">{member.name}</h4>
              <p className="text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutInfo;
