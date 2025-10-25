import React from "react";
import banner from "@/assets/images/images-about/avt10.jpg";

const BannerMenu: React.FC = () => {
  return (
    <section
      className="mt-20 w-full h-[200px] relative flex flex-col justify-center items-center text-white px-10"
      style={{
        backgroundImage: `url(${banner})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay mờ */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Nội dung */}
      <div className="relative z-10 text-center">
        <h2 className="text-4xl font-bold mb-4 drop-shadow-lg">
          Thức uống tươi ngon mỗi ngày
        </h2>
        <p className="text-lg mb-6 drop-shadow-lg">
          Trà sữa – Cà phê – Nước ép – Sinh tố, tất cả trong một menu.
        </p>
      </div>
    </section>
  );
};

export default BannerMenu;
