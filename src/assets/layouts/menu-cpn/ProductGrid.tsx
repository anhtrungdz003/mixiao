import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import { useCart } from "./CartContext";
import FilterBar from "./FilterBar";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category?: string;
  stock?: number;
}

const ProductGrid: React.FC = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  // --- Lấy dữ liệu ---
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/products");
        setProducts(res.data.data);
        setFilteredProducts(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // --- Lọc sản phẩm frontend ---
  const handleFilterChange = useCallback(
    (filters: {
      category: string;
      priceRange: string;
      sort: string;
      search: string;
    }) => {
      let result = [...products];

      // Lọc theo loại
      if (filters.category !== "Tất cả") {
        result = result.filter(
          (p) => p.category?.toLowerCase() === filters.category.toLowerCase()
        );
      }

      // Lọc theo giá
      if (filters.priceRange === "Dưới 30000")
        result = result.filter((p) => p.price < 30000);
      else if (filters.priceRange === "30000-40000")
        result = result.filter((p) => p.price >= 30000 && p.price <= 40000);
      else if (filters.priceRange === "Trên 40000")
        result = result.filter((p) => p.price > 40000);

      // Tìm kiếm theo tên
      if (filters.search)
        result = result.filter((p) =>
          p.name.toLowerCase().includes(filters.search.toLowerCase())
        );

      // Sắp xếp
      switch (filters.sort) {
        case "Giá tăng dần":
          result.sort((a, b) => a.price - b.price);
          break;
        case "Giá giảm dần":
          result.sort((a, b) => b.price - a.price);
          break;
        case "Mới nhất":
          result.sort((a, b) => b.id - a.id);
          break;
        default:
          break;
      }

      setFilteredProducts(result);
      setCurrentPage(1);
    },
    [products]
  );

  if (loading) return <p className="text-center py-10">Đang tải sản phẩm...</p>;

  // --- Phân trang ---
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="px-6 py-10">
      <div className="mb-6">
        <FilterBar onFilterChange={handleFilterChange} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {currentProducts.map((item) => (
          <ProductCard
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            image={item.image}
            onAddToCart={(quantity) => addToCart({ ...item, quantity })}
          />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p className="text-center text-gray-500 mt-6">
          Không tìm thấy sản phẩm phù hợp.
        </p>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 rounded transition-all ${
                currentPage === i + 1
                  ? "bg-pink-500 text-white shadow-md"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductGrid;
