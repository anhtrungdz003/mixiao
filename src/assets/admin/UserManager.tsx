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

const API_BASE_URL = "http://localhost:3000/api/admin/users";

interface User {
  id: number;
  username: string;
  full_name: string;
  email: string;
  phone: string;
  address?: string;
  avatar?: string;
  role: "user" | "admin";
  created_at: string;
  updated_at: string;
}

interface Province {
  code: number;
  name: string;
  districts: District[];
}

interface District {
  code: number;
  name: string;
  wards: Ward[];
}

interface Ward {
  code: number;
  name: string;
}

const UserManager: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  interface UserForm extends Partial<User> {
    password?: string;
  }

  const [formData, setFormData] = useState<UserForm>({});
  const [detailOpen, setDetailOpen] = useState(false);
  const [detailData, setDetailData] = useState<User | null>(null);

  // --- Địa chỉ ---
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<number | "">("");
  const [selectedDistrict, setSelectedDistrict] = useState<number | "">("");
  const [selectedWard, setSelectedWard] = useState<number | "">("");

  const token = localStorage.getItem("token");

  const fetchUsers = useCallback(async () => {
    if (!token) return;
    try {
      const res = await fetch(API_BASE_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        const sortedUsers: User[] = [...data.data].sort((a, b) => {
          if (a.role === "admin" && b.role !== "admin") return -1;
          if (a.role !== "admin" && b.role === "admin") return 1;
          return a.id - b.id;
        });
        setUsers(sortedUsers);
      } else {
        alert(data.message || "Lỗi khi lấy danh sách user");
      }
    } catch {
      alert("Lỗi hệ thống khi lấy danh sách user");
    }
  }, [token]);

  useEffect(() => {
    void fetchUsers();
  }, [fetchUsers]);

  const fetchProvinces = async () => {
    try {
      const res = await fetch("https://provinces.open-api.vn/api/p/");
      const data = await res.json();
      setProvinces(data);
    } catch {
      console.error("Lỗi khi lấy tỉnh");
    }
  };

  const fetchDistricts = async (provinceCode: number) => {
    try {
      const res = await fetch(
        `https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`
      );
      const data = await res.json();
      setDistricts(data.districts || []);
    } catch {
      console.error("Lỗi khi lấy huyện");
    }
  };

  const fetchWards = async (districtCode: number) => {
    try {
      const res = await fetch(
        `https://provinces.open-api.vn/api/d/${districtCode}?depth=2`
      );
      const data = await res.json();
      setWards(data.wards || []);
    } catch {
      console.error("Lỗi khi lấy xã");
    }
  };

  useEffect(() => {
    fetchProvinces();
  }, []);

  const handleProvinceChange = (code: number) => {
    setSelectedProvince(code);
    setSelectedDistrict("");
    setSelectedWard("");
    setDistricts([]);
    setWards([]);
    if (code) fetchDistricts(code);
  };

  const handleDistrictChange = (code: number) => {
    setSelectedDistrict(code);
    setSelectedWard("");
    setWards([]);
    if (code) fetchWards(code);
  };

  const handleWardChange = (code: number) => setSelectedWard(code);

  const handleAdd = () => {
    setEditIndex(null);
    setFormData({});
    setSelectedProvince("");
    setSelectedDistrict("");
    setSelectedWard("");
    setIsDialogOpen(true);
  };

  const handleEdit = (index: number) => {
    const user = users[index];
    setEditIndex(index);
    setFormData(user);
    setIsDialogOpen(true);

    if (user.address) {
      const parts = user.address.split(",").map((s) => s.trim());
      const province = provinces.find((p) => p.name === parts[2]);
      const district = districts.find((d) => d.name === parts[1]);
      const ward = wards.find((w) => w.name === parts[0]);
      if (province) handleProvinceChange(province.code);
      if (district) handleDistrictChange(district.code);
      if (ward) setSelectedWard(ward.code);
    }
  };

  const handleSave = async () => {
    // Kiểm tra nhập đủ thông tin
    if (
      !formData.username?.trim() ||
      !formData.full_name?.trim() ||
      !formData.email?.trim() ||
      !formData.phone?.trim() ||
      !formData.password?.trim() ||
      !selectedProvince ||
      !selectedDistrict ||
      !selectedWard
    ) {
      alert("Vui lòng nhập đầy đủ tất cả các thông tin!");
      return;
    }

    // Kiểm tra email phải kết thúc bằng @gmail.com
    const emailRegex = /^[\w.-]+@gmail\.com$/;
    if (!emailRegex.test(formData.email)) {
      alert("Email phải có đuôi @gmail.com");
      return;
    }

    const address = [
      selectedWard ? wards.find((w) => w.code === selectedWard)?.name : "",
      selectedDistrict
        ? districts.find((d) => d.code === selectedDistrict)?.name
        : "",
      selectedProvince
        ? provinces.find((p) => p.code === selectedProvince)?.name
        : "",
    ]
      .filter(Boolean)
      .join(", ");

    const payload = {
      ...formData,
      address,
      role: formData.role || "user",
    };

    try {
      let res;
      if (editIndex === null) {
        res = await fetch(API_BASE_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(`${API_BASE_URL}/${users[editIndex].id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
      }
      const data = await res.json();
      if (res.ok) {
        setIsDialogOpen(false);
        fetchUsers();
      } else {
        alert(data.message || "Lỗi khi lưu user");
      }
    } catch {
      alert("Lỗi hệ thống khi lưu user");
    }
  };

  const handleDelete = async (userId: number) => {
    const userToDelete = users.find((u) => u.id === userId);
    if (!userToDelete) return;
    if (userToDelete.role === "admin") {
      alert("❌ Không thể xóa tài khoản admin!");
      return;
    }
    if (!window.confirm("Bạn có chắc chắn muốn xóa user này?")) return;

    try {
      const res = await fetch(`${API_BASE_URL}/${userId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) fetchUsers();
      else alert(data.message || "Lỗi khi xóa user");
    } catch {
      alert("Lỗi hệ thống khi xóa user");
    }
  };

  const handleViewDetail = async (userId: number) => {
    try {
      const res = await fetch(`${API_BASE_URL}/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setDetailData(data.data);
        setDetailOpen(true);
      } else alert(data.message || "Lỗi khi lấy chi tiết user");
    } catch {
      alert("Lỗi hệ thống khi lấy chi tiết user");
    }
  };

  const getRoleColor = (role: User["role"]) =>
    role === "admin" ? "text-pink-500 font-semibold" : "text-gray-600";

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

      {/* Modal Thêm/Sửa */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editIndex === null ? "Thêm user mới" : "Chỉnh sửa user"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2 max-h-[60vh] overflow-y-auto">
            <Input
              value={formData.username || ""}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              placeholder="Tên người dùng"
            />
            <Input
              value={formData.full_name || ""}
              onChange={(e) =>
                setFormData({ ...formData, full_name: e.target.value })
              }
              placeholder="Họ và tên"
            />
            <Input
              value={formData.email || ""}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Email"
            />
            <Input
              value={formData.phone || ""}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              placeholder="SĐT"
            />
            <Input
              type="password"
              value={formData.password || ""}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder="Mật khẩu"
            />
            <select
              value={selectedProvince}
              onChange={(e) => handleProvinceChange(Number(e.target.value))}
              className="w-full border rounded p-1"
            >
              <option value="">Chọn tỉnh</option>
              {provinces.map((p) => (
                <option key={p.code} value={p.code}>
                  {p.name}
                </option>
              ))}
            </select>
            {districts.length > 0 && (
              <select
                value={selectedDistrict}
                onChange={(e) => handleDistrictChange(Number(e.target.value))}
                className="w-full border rounded p-1"
              >
                <option value="">Chọn huyện</option>
                {districts.map((d) => (
                  <option key={d.code} value={d.code}>
                    {d.name}
                  </option>
                ))}
              </select>
            )}
            {wards.length > 0 && (
              <select
                value={selectedWard}
                onChange={(e) => handleWardChange(Number(e.target.value))}
                className="w-full border rounded p-1"
              >
                <option value="">Chọn xã</option>
                {wards.map((w) => (
                  <option key={w.code} value={w.code}>
                    {w.name}
                  </option>
                ))}
              </select>
            )}
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

      {/* Modal Chi tiết */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Chi tiết user</DialogTitle>
          </DialogHeader>
          {detailData && (
            <Table>
              <TableBody>
                {Object.entries(detailData).map(([key, value]) => (
                  <TableRow key={key}>
                    <TableCell className="font-semibold capitalize">
                      {key.replace("_", " ")}
                    </TableCell>
                    <TableCell>
                      {key === "created_at" || key === "updated_at"
                        ? new Date(value as string).toLocaleString()
                        : value}
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
