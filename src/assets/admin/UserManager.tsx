import React, { useEffect, useState, useCallback } from "react";
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
import axios, { AxiosError } from "axios";

const API_BASE_URL = "http://localhost:3000/api/admin/users";

interface User {
  id: number;
  username: string;
  full_name: string;
  email: string;
  phone: string;
  address: string;
  avatar?: string;
  role: "user" | "admin";
  created_at: string;
  updated_at: string;
}

const UserManager: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<User>>({});
  const [detailOpen, setDetailOpen] = useState(false);
  const [detailData, setDetailData] = useState<User | null>(null);

  const token = localStorage.getItem("token");

  // --- Lấy danh sách user ---
  const fetchUsers = useCallback(async () => {
    if (!token) {
      alert("Bạn chưa đăng nhập!");
      return;
    }
    try {
      const res = await axios.get<{ data: User[] }>(API_BASE_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // ✅ Sắp xếp admin lên đầu
      const sortedUsers = [...res.data.data].sort((a, b) => {
        if (a.role === "admin" && b.role !== "admin") return -1;
        if (a.role !== "admin" && b.role === "admin") return 1;
        return a.id - b.id;
      });

      setUsers(sortedUsers);
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      alert(err.response?.data?.message || "Lỗi khi lấy danh sách user");
    }
  }, [token]);

  useEffect(() => {
    void fetchUsers();
  }, [fetchUsers]);

  const handleAdd = () => {
    setEditIndex(null);
    setFormData({});
    setIsDialogOpen(true);
  };

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setFormData(users[index]);
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!formData.username || !formData.email) {
      alert("Vui lòng nhập đầy đủ username và email!");
      return;
    }

    try {
      const payload = {
        ...formData,
        password: (formData as any).password || "123456", // ✅ thêm mặc định
        role: formData.role || "user",
      };

      if (editIndex === null) {
        await axios.post(API_BASE_URL, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.put(`${API_BASE_URL}/${users[editIndex].id}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setIsDialogOpen(false);
      await fetchUsers();
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      alert(err.response?.data?.message || "Lỗi khi lưu user");
    }
  };

  // --- Xóa user (không xóa admin) ---
  const handleDelete = async (userId: number) => {
    const userToDelete = users.find((u) => u.id === userId);
    if (!userToDelete) return;

    if (userToDelete.role === "admin") {
      alert("❌ Không thể xóa tài khoản admin!");
      return;
    }

    if (!window.confirm("Bạn có chắc chắn muốn xóa user này?")) return;

    try {
      await axios.delete(`${API_BASE_URL}/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchUsers();
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      alert(err.response?.data?.message || "Lỗi khi xóa user");
    }
  };

  // --- Xem chi tiết ---
  const handleViewDetail = async (userId: number) => {
    try {
      const res = await axios.get<{ data: User }>(
        `${API_BASE_URL}/${userId}`, // ✅ sửa: bỏ “/users” thừa
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setDetailData(res.data.data);
      setDetailOpen(true);
    } catch {
      alert("Lỗi khi lấy chi tiết user");
    }
  };

  const getRoleColor = (role: User["role"]) =>
    role === "admin" ? "text-pink-500 font-semibold" : "text-gray-600";

  const userFields: (keyof User)[] = [
    "username",
    "full_name",
    "email",
    "phone",
    "address",
    "role",
  ];

  const detailFields: (keyof User)[] = [
    "id",
    "username",
    "full_name",
    "email",
    "phone",
    "address",
    "avatar",
    "role",
    "created_at",
    "updated_at",
  ];

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md border border-pink-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-pink-500">
          Quản lý người dùng
        </h2>
        <Button onClick={handleAdd} className="bg-pink-500 hover:bg-pink-600">
          <Plus className="mr-2 h-4 w-4" /> Thêm user
        </Button>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableCaption>Danh sách người dùng</TableCaption>
          <TableHeader>
            <TableRow className="bg-pink-50">
              <TableHead>ID</TableHead>
              <TableHead>Tên</TableHead>
              <TableHead>Họ và tên</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>SĐT</TableHead>
              <TableHead>Địa chỉ</TableHead>
              <TableHead>Vai trò</TableHead>
              <TableHead>Ngày tạo</TableHead>
              <TableHead>Cập nhật</TableHead>
              <TableHead className="text-center">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={user.id} className="hover:bg-pink-50">
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.full_name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.address}</TableCell>
                <TableCell className={getRoleColor(user.role)}>
                  {user.role}
                </TableCell>
                <TableCell>
                  {new Date(user.created_at).toLocaleString()}
                </TableCell>
                <TableCell>
                  {new Date(user.updated_at).toLocaleString()}
                </TableCell>
                <TableCell className="text-center flex justify-center gap-2">
                  <button
                    className="p-1 text-blue-500 hover:text-blue-700"
                    onClick={() => handleViewDetail(user.id)}
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    className="p-1 text-yellow-500 hover:text-yellow-700"
                    onClick={() => handleEdit(index)}
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    className="p-1 text-red-500 hover:text-red-700 disabled:opacity-50"
                    disabled={user.role === "admin"}
                    onClick={() => handleDelete(user.id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* --- Modal Thêm/Sửa --- */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editIndex === null ? "Thêm user mới" : "Chỉnh sửa user"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            {userFields.map((key) => (
              <div key={key}>
                <label className="text-sm text-gray-700 capitalize">
                  {key.replace("_", " ")}
                </label>
                <Input
                  value={formData[key] ?? ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormData((prev) => ({ ...prev, [key]: e.target.value }))
                  }
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

      {/* --- Modal Chi tiết --- */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Chi tiết user</DialogTitle>
          </DialogHeader>
          {detailData && (
            <Table>
              <TableBody>
                {detailFields.map((key) => (
                  <TableRow key={key}>
                    <TableCell className="font-semibold capitalize">
                      {key.replace("_", " ")}
                    </TableCell>
                    <TableCell>
                      {key === "created_at" || key === "updated_at"
                        ? new Date(detailData[key]).toLocaleString()
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

export default UserManager;
