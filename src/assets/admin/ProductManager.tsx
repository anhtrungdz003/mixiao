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

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
}

const API_URL = "http://localhost:3000/api/products";
const BACKEND_URL = "http://localhost:3000"; // URL backend để prepend cho ảnh từ uploads

const ProductManager: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({
    id: 0,
    name: "",
    category: "",
    price: 0,
    stock: 0,
    image: "",
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const [detailOpen, setDetailOpen] = useState(false);
  const [detailData, setDetailData] = useState<Product | null>(null);

  const token = localStorage.getItem("token");

  // Hàm xử lý URL ảnh: Prepend URL đúng dựa trên nguồn
  const getImageSrc = (image: string) => {
    if (!image) return "";

    // Nếu đường dẫn từ backend uploads
    if (image.startsWith("/uploads")) {
      return `${BACKEND_URL}${image}`;
    }

    // Nếu là tên file hoặc từ images-menu cũ
    if (!image.includes("/")) {
      return `/images-menu/${image}`; // frontend serve trực tiếp
    }

    // Nếu là URL đầy đủ
    if (image.startsWith("http")) {
      return image;
    }

    // Fallback
    return image;
  };

  // --- Fetch danh sách sản phẩm ---
  const fetchProducts = async () => {
    try {
      const res = await fetch(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
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
    setSelectedImage(null);
    setImagePreview("");
    setIsDialogOpen(true);
  };

  const handleEdit = (index: number) => {
    setEditIndex(index);
    const product = products[index];
    setFormData(product);
    setSelectedImage(null);
    // Set imagePreview với URL đầy đủ
    setImagePreview(getImageSrc(product.image));
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

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Chỉ cho phép upload file ảnh!");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert("Kích thước file không được vượt quá 5MB!");
        return;
      }
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file)); // Preview file local
    }
  };

  const handleSave = async () => {
    // Kiểm tra đầy đủ
    if (
      !formData.name?.trim() ||
      !formData.category?.trim() ||
      !formData.price ||
      formData.price <= 0 ||
      !formData.stock ||
      selectedImage === null
    ) {
      alert("Vui lòng điền đầy đủ thông tin sản phẩm và chọn ảnh!");
      return;
    }

    try {
      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("category", formData.category);
      payload.append("price", (formData.price || 0).toString());
      payload.append("stock", (formData.stock || 0).toString());
      if (selectedImage) payload.append("image", selectedImage);

      const url =
        editIndex === null ? API_URL : `${API_URL}/${products[editIndex].id}`;
      const method = editIndex === null ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: payload,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Lỗi khi lưu sản phẩm");
      }

      const data = await res.json();

      if (editIndex === null) {
        setProducts([...products, data.data]);
      } else {
        const updatedIndex = products.findIndex((p) => p.id === data.data.id);
        if (updatedIndex !== -1) {
          const updatedProducts = [...products];
          updatedProducts[updatedIndex] = data.data;
          setProducts(updatedProducts);
        }
      }

      setIsDialogOpen(false);
      setSelectedImage(null);
      setImagePreview("");
    } catch (err) {
      console.error("Lỗi khi lưu:", err);
      alert(err instanceof Error ? err.message : "Lỗi khi lưu sản phẩm!");
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
      <div className="sticky top-0 z-10 bg-white p-6 border-b border-pink-100 flex justify-between items-center">
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
                      src={getImageSrc(p.image)} // Sử dụng hàm getImageSrc
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
            <div>
              <label className="text-sm text-gray-700">Tên sản phẩm</label>
              <Input
                type="text"
                value={formData.name || ""}
                onChange={(e) => handleChange(e, "name")}
              />
            </div>
            <div>
              <label className="text-sm text-gray-700">Loại</label>
              <select
                value={formData.category || ""}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full border rounded-md p-2"
              >
                <option value="">Chọn loại</option>
                <option value="Trà sữa">Trà sữa</option>
                <option value="Cà phê">Cà phê</option>
                <option value="Trà trái cây">Trà trái cây</option>
                <option value="Sinh tố">Sinh tố</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-700">Giá</label>
              <div className="relative">
                <Input
                  type="number"
                  value={formData.price || 0}
                  onChange={(e) => handleChange(e, "price")}
                  className="pr-16" // padding để tránh chữ bị che
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-pink-500 font-semibold">
                  đ
                </span>
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-700">Tồn kho</label>
              <Input
                type="number"
                value={formData.stock || 0}
                onChange={(e) => handleChange(e, "stock")}
              />
            </div>
            <div>
              <label className="text-sm text-gray-700">Ảnh sản phẩm</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full border p-2 rounded-md"
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-20 h-20 rounded-md mt-2 object-cover"
                />
              )}
            </div>
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
                      {key === "price" ? (
                        formatPrice(detailData[key])
                      ) : key === "image" && detailData[key] ? (
                        <img
                          src={getImageSrc(detailData[key])} // Sử dụng hàm getImageSrc
                          alt={detailData.name}
                          className="w-20 h-20 object-cover rounded-md"
                        />
                      ) : (
                        detailData[key]
                      )}
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
