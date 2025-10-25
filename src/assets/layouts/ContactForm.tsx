import React, { useState } from "react";

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data:", formData);
    alert("Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm.");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 mt-10 space-y-8">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-pink-600">
        Liên hệ với Mixiao
      </h2>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Form liên hệ */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 bg-white p-6 rounded-xl shadow-lg space-y-4"
        >
          <div>
            <label className="block mb-1 font-medium">Họ tên</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Nhập họ tên của bạn"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Nhập email của bạn"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Số điện thoại</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Nhập số điện thoại"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Nội dung</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Nhập nội dung liên hệ"
              required
            ></textarea>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-pink-600 text-white px-6 py-2 rounded-full hover:bg-pink-700 transition-colors shadow-md"
            >
              Gửi liên hệ
            </button>
          </div>
        </form>

        {/* Thông tin liên hệ */}
        <div className="flex-1 bg-pink-50 p-6 rounded-xl shadow-lg space-y-4">
          <h3 className="text-xl font-semibold mb-4 text-pink-600">
            Thông tin cửa hàng
          </h3>
          <p>
            <strong>Địa chỉ:</strong> Mường Thanh, Vĩnh Tường, Vĩnh Phúc
          </p>
          <p>
            <strong>Hotline:</strong>{" "}
            <a href="tel:0366559916" className="text-pink-500 underline">
              0366.559.916
            </a>
          </p>
          <p>
            <strong>Email:</strong>{" "}
            <a
              href="mailto:contact@2003mixiao.vn"
              className="text-pink-500 underline"
            >
              contact@2003mixiao.vn
            </a>
          </p>
          <p>
            <strong>Giờ mở cửa:</strong> 8:00 - 22:00 (Tất cả các ngày)
          </p>

          {/* Bản đồ Google Map */}
          <div className="mt-4">
            <iframe
              title="Mixiao Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.666!2d105.841!3d21.027!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab23bdb3f21d%3A0x1234567890abcdef!2sMường%20Thanh%2C%20Vĩnh%20Tường%2C%20Vĩnh%20Phúc!5e0!3m2!1sen!2s!4v1600000000000!5m2!1sen!2s"
              width="100%"
              height="250"
              className="rounded-xl shadow-md"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
