import React from "react";
import fashion1 from "@/assets/images/images-about/fashion1.jpg";
import fashion2 from "@/assets/images/images-about/fashion2.jpg";
import fashion3 from "@/assets/images/images-about/fashion3.jpg";
import fashion4 from "@/assets/images/images-about/fashion4.jpg";
import fashion5 from "@/assets/images/images-about/fashion5.jpg";
import fashion6 from "@/assets/images/images-about/fashion6.jpg";

const partners = [fashion1, fashion2, fashion3, fashion4, fashion5, fashion6];

const AboutSection: React.FC = () => {
  return (
    <section className="py-16 px-4 md:px-8 bg-gradient-to-b from-pink-50 to-white">
      <h2 className="text-3xl font-bold text-pink-600 mb-10 text-center">
        Đối tác & Thương hiệu
      </h2>

      <div
        className="
          grid
          grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6
          gap-6
          items-center
          justify-items-center
          mx-auto
          max-w-6xl
        "
      >
        {partners.map((img, index) => (
          <div
            key={index}
            className="flex items-center justify-center w-full h-full"
          >
            <img
              src={img}
              alt={`Đối tác ${index + 1}`}
              className="h-24 w-auto object-contain rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutSection;
