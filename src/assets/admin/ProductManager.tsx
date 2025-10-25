import React, { useState, useEffect } from "react";
import type { ChangeEvent } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/dialog";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Edit, Trash2, Plus, Eye } from "lucide-react";

// --- Kiểu dữ liệu sản phẩm ---
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
}

const API_URL = "http://localhost:3000/api/products";

const ProductManager: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<Product>({
    id: 0,
    name: "",
    category: "",
    price: 0,
    stock: 0,
    image: "",
  });

  const [detailOpen, setDetailOpen] = useState(false);
  const [detailData, setDetailData] = useState<Product | null>(null);

  const token = localStorage.getItem("token");

  // --- Fetch danh sách sản phẩm ---
  const fetchProducts = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      if (data.data) setProducts(data.data);
      else setProducts(data);
    } catch (err) {
      console.error("Lỗi tải dữ liệu:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAdd = () => {
    setEditIndex(null);
    setFormData({
      id: 0,
      name: "",
      category: "",
      price: 0,
      stock: 0,
      image: "",
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setFormData(products[index]);
    setIsDialogOpen(true);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    key: keyof Product
  ) => {
    const value =
      key === "price" || key === "stock"
        ? Number(e.target.value)
        : e.target.value;
    setFormData({ ...formData, [key]: value });
  };

  const handleSave = async () => {
    console.log("handleSave called", formData);
    if (!formData.name || formData.price <= 0) {
      alert("Vui lòng nhập tên và giá hợp lệ!");
      return;
    }

    try {
      console.log("Sending fetch...");
      if (editIndex === null) {
        // Thêm mới
        const res = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        setProducts([...products, { ...formData, id: data.insertId || 0 }]);
      } else {
        // Cập nhật
        const id = products[editIndex].id;
        await fetch(`${API_URL}/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        });
        const updated = [...products];
        updated[editIndex] = formData;
        setProducts(updated);
      }
      setIsDialogOpen(false);
    } catch (err) {
      console.error("Lỗi khi lưu:", err);
    }
  };

  const handleDelete = async (index: number) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) return;
    try {
      const id = products[index].id;
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.filter((_, i) => i !== index));
    } catch (err) {
      console.error("Lỗi khi xóa:", err);
    }
  };

  const handleViewDetail = (product: Product) => {
    setDetailData(product);
    setDetailOpen(true);
  };

  const formatPrice = (price: number) =>
    price.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md border border-pink-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-pink-500">
          Quản lý sản phẩm
        </h2>
        <Button onClick={handleAdd} className="bg-pink-500 hover:bg-pink-600">
          <Plus className="mr-2 h-4 w-4" /> Thêm sản phẩm
        </Button>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableCaption>Danh sách sản phẩm</TableCaption>
          <TableHeader>
            <TableRow className="bg-pink-50">
              <TableHead>ID</TableHead>
              <TableHead>Tên sản phẩm</TableHead>
              <TableHead>Loại</TableHead>
              <TableHead>Giá</TableHead>
              <TableHead>Tồn kho</TableHead>
              <TableHead>Ảnh sản phẩm</TableHead>
              <TableHead className="text-center">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((p, i) => (
              <TableRow key={p.id} className="hover:bg-pink-50">
                <TableCell>{p.id}</TableCell>
                <TableCell>{p.name}</TableCell>
                <TableCell>{p.category}</TableCell>
                <TableCell className="text-pink-600 font-semibold">
                  {formatPrice(p.price)}
                </TableCell>
                <TableCell>{p.stock}</TableCell>
                <TableCell>
                  {p.image && (
                    <img
                      src={
                        p.image.startsWith("http")
                          ? p.image
                          : `/images-menu/${p.image}`
                      }
                      alt={p.name}
                      className="w-12 h-12 rounded-md object-cover"
                    />
                  )}
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      className="p-1 text-blue-500 hover:text-blue-700"
                      onClick={() => handleViewDetail(p)}
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      className="p-1 text-yellow-500 hover:text-yellow-700"
                      onClick={() => handleEdit(i)}
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      className="p-1 text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(i)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Modal Thêm/Sửa */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editIndex === null ? "Thêm sản phẩm mới" : "Chỉnh sửa sản phẩm"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            {(Object.keys(formData) as (keyof Product)[])
              .filter((key) => key !== "id")
              .map((key) => (
                <div key={key}>
                  <label className="text-sm text-gray-700 capitalize">
                    {key}
                  </label>
                  <Input
                    type={
                      key === "price" || key === "stock" ? "number" : "text"
                    }
                    value={formData[key] ?? ""}
                    onChange={(e) => handleChange(e, key)}
                  />
                </div>
              ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Hủy
            </Button>
            <Button
              className="bg-pink-500 hover:bg-pink-600"
              onClick={handleSave}
            >
              Lưu
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal chi tiết */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Chi tiết sản phẩm</DialogTitle>
          </DialogHeader>
          {detailData && (
            <Table>
              <TableBody>
                {(Object.keys(detailData) as (keyof Product)[]).map((key) => (
                  <TableRow key={key}>
                    <TableCell className="font-semibold capitalize">
                      {key}
                    </TableCell>
                    <TableCell>
                      {key === "price"
                        ? formatPrice(detailData[key])
                        : detailData[key]}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setDetailOpen(false)}>
              Đóng
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductManager;
