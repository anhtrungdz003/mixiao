import React, { useState } from "react";
import type { CartItem } from "./CartContext";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";

interface ProductCardProps extends Omit<CartItem, "quantity"> {
  onAddToCart?: (quantity: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  image,
}) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleAddToCart = () => {
    const userToken = localStorage.getItem("token"); // giả sử token lưu ở localStorage
    if (!userToken) {
      // chưa đăng nhập → chuyển trang login
      navigate("/login");
      return;
    }

    // đã đăng nhập → thêm vào giỏ
    addToCart({
      id,
      name,
      price,
      image: image.startsWith("/") ? image : `/images-menu/${image}`,
      quantity,
    });

    setMessage("✅ Đã thêm vào giỏ hàng!");
    setTimeout(() => setMessage(""), 2000);
    setQuantity(1);
  };

  const imgSrc = image.startsWith("/") ? image : `/images-menu/${image}`;

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition flex flex-col">
      <div className="relative w-full h-56 overflow-hidden">
        <img
          src={imgSrc}
          alt={name}
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <p className="text-pink-500 font-bold text-lg mb-3">
          {price.toLocaleString()}đ
        </p>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm text-gray-600">Số lượng:</span>
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
            className="w-16 border rounded-lg px-2 py-1 text-center text-sm"
          />
        </div>

        <div className="mt-auto">
          <button
            onClick={handleAddToCart}
            className="w-full bg-pink-500 text-white py-2 rounded-full text-sm font-semibold hover:bg-pink-600 transition"
          >
            🛒 Thêm vào giỏ
          </button>
        </div>

        {message && (
          <p className="text-green-600 text-sm font-medium mt-2">{message}</p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
