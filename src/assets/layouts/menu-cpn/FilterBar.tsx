import React, { useState, useEffect } from "react";
import type { ChangeEvent } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

interface FilterBarProps {
  onFilterChange?: (filters: {
    category: string;
    priceRange: string;
    sort: string;
    search: string;
  }) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange }) => {
  const [category, setCategory] = useState("Tất cả");
  const [priceRange, setPriceRange] = useState("Tất cả");
  const [sort, setSort] = useState("Mới nhất");
  const [searchTerm, setSearchTerm] = useState("");

  // Debounce search để tránh gọi filter quá nhiều lần
  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(searchTerm), 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Gọi lọc khi các giá trị thay đổi
  useEffect(() => {
    const filters = { category, priceRange, sort, search: debouncedSearch };
    onFilterChange?.(filters);
  }, [category, priceRange, sort, debouncedSearch, onFilterChange]);

  return (
    <div className="w-full bg-white/80 backdrop-blur border border-gray-100 rounded-xl shadow-sm py-3 px-4 flex flex-wrap gap-4 justify-between items-center transition-all duration-300 hover:shadow-md">
      {/* --- Bộ lọc bên trái --- */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex items-center gap-2 text-pink-500 font-medium">
          <SlidersHorizontal className="w-4 h-4" />
          <span>Bộ lọc</span>
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-pink-400 focus:outline-none"
        >
          <option value="Tất cả">Tất cả</option>
          <option value="Trà sữa">Trà sữa</option>
          <option value="Cà phê">Cà phê</option>
          <option value="Trà trái cây">Trà trái cây</option>
          <option value="Sinh tố">Sinh tố</option>
        </select>

        <select
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-pink-400 focus:outline-none"
        >
          <option value="Tất cả">Giá: Tất cả</option>
          <option value="Dưới 30000">Dưới 30.000đ</option>
          <option value="30000-40000">30.000đ - 40.000đ</option>
          <option value="Trên 40000">Trên 40.000đ</option>
        </select>
      </div>

      {/* --- Ô tìm kiếm sản phẩm --- */}
      <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 shadow-sm focus-within:ring-2 focus-within:ring-pink-400 transition">
        <input
          type="text"
          placeholder="Tìm sản phẩm..."
          value={searchTerm}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchTerm(e.target.value)
          }
          className="outline-none text-sm px-2 py-1 w-36 sm:w-52 bg-transparent"
        />
        <Search className="w-4 h-4 text-gray-500" />
      </div>

      {/* --- Sắp xếp --- */}
      <div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-pink-400 focus:outline-none"
        >
          <option value="Mới nhất">Mới nhất</option>
          <option value="Bán chạy">Bán chạy</option>
          <option value="Giá tăng dần">Giá tăng dần</option>
          <option value="Giá giảm dần">Giá giảm dần</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
