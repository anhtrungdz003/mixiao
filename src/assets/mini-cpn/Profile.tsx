import React, { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import defaultAvatar from "@/assets/images/mixiao.png";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/dialog";

type UserType = {
  id: number;
  username: string;
  full_name?: string;
  email: string;
  avatar?: string;
  role: "user" | "admin";
  created_at?: string;
  phone?: string;
  province?: number;
  district?: number;
  ward?: number;
  address?: string;
  avatarFile?: File;
};

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

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserType | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<UserType>>({});
  const [provincesData, setProvincesData] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [isAvatarLoading, setIsAvatarLoading] = useState(false);
  const [avatarError, setAvatarError] = useState<string>("");

  const API_BASE_URL = "http://localhost:3000";
  const avatarInputRef = useRef<HTMLInputElement>(null);

  // --- GET USER ---
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
      return;
    }
    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);
    setFormData(parsedUser);
  }, [navigate]);

  // --- GET PROVINCES ---
  useEffect(() => {
    fetch("https://provinces.open-api.vn/api/p/")
      .then((res) => res.json())
      .then((data) => setProvincesData(data))
      .catch(console.error);
  }, []);

  // --- HANDLE PROVINCE CHANGE ---
  const handleProvinceChange = useCallback((provinceCode: number) => {
    const code = Number(provinceCode);
    setFormData((prev) => ({
      ...prev,
      province: isNaN(code) ? undefined : code,
      district: undefined,
      ward: undefined,
    }));
    setWards([]);
    if (!code || isNaN(code)) {
      setDistricts([]);
      return;
    }
    fetch(`https://provinces.open-api.vn/api/p/${code}?depth=2`)
      .then((res) => res.json())
      .then((data: Province) => setDistricts(data.districts))
      .catch(console.error);
  }, []);

  // --- HANDLE DISTRICT CHANGE ---
  const handleDistrictChange = useCallback((districtCode: number) => {
    const code = Number(districtCode);
    setFormData((prev) => ({
      ...prev,
      district: isNaN(code) ? undefined : code,
      ward: undefined,
    }));
    if (!code || isNaN(code)) {
      setWards([]);
      return;
    }
    fetch(`https://provinces.open-api.vn/api/d/${code}?depth=2`)
      .then((res) => res.json())
      .then((data: District) => setWards(data.wards))
      .catch(console.error);
  }, []);

  // --- VALIDATE AVATAR FILE ---
  const validateAvatarFile = (file: File): string | null => {
    if (!file.type.startsWith("image/")) return "Chỉ upload file ảnh!";
    if (file.size > 5 * 1024 * 1024) return "File không quá 5MB!";
    return null;
  };

  const handleAvatarClick = () => avatarInputRef.current?.click();

  const handleAvatarUpload = async (file: File) => {
    const validationError = validateAvatarFile(file);
    if (validationError) {
      setAvatarError(validationError);
      return;
    }
    setAvatarError("");
    setIsAvatarLoading(true);

    const formPayload = new FormData();
    formPayload.append("avatar", file);
    if (user) {
      formPayload.append("username", user.username);
      formPayload.append("email", user.email);
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/users/me`, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: formPayload,
      });
      const data = await res.json();
      if (res.ok && user) {
        const updatedUser: UserType = { ...user, avatar: data.data.avatar };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        window.dispatchEvent(
          new CustomEvent("avatarUpdated", { detail: updatedUser })
        );
        alert("Cập nhật avatar thành công!");
      } else {
        setAvatarError(data.message || "Cập nhật avatar thất bại");
      }
    } catch {
      setAvatarError("Lỗi hệ thống!");
    } finally {
      setIsAvatarLoading(false);
    }
  };

  const handleAvatarFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleAvatarUpload(file);
  };

  // --- VALIDATE FORM ---
  const validateForm = (): string | null => {
    if (!formData.username?.trim()) return "Nhập Tên người dùng!";
    if (!formData.full_name?.trim()) return "Nhập Họ và tên!";
    if (!formData.email?.trim()) return "Nhập Email!";
    if (!formData.email?.endsWith("@gmail.com"))
      return "Email phải có đuôi @gmail.com!";
    if (!formData.phone?.trim()) return "Nhập Số điện thoại!";
    if (!/^\d{10,11}$/.test(formData.phone))
      return "Số điện thoại phải 10-11 số!";
    if (!formData.province) return "Chọn Tỉnh/Thành phố!";
    if (!formData.district) return "Chọn Quận/Huyện!";
    if (!formData.ward) return "Chọn Xã/Phường!";
    return null;
  };

  const handleSave = async () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setIsLoading(true);

    const fullAddress = `${
      wards.find((w) => w.code === formData.ward)?.name || ""
    }, ${districts.find((d) => d.code === formData.district)?.name || ""}, ${
      provincesData.find((p) => p.code === formData.province)?.name || ""
    }`;

    const formPayload = new FormData();
    formPayload.append("username", formData.username!);
    formPayload.append("full_name", formData.full_name!);
    formPayload.append("email", formData.email!);
    formPayload.append("phone", formData.phone!);
    formPayload.append("address", fullAddress);
    if (formData.avatarFile) formPayload.append("avatar", formData.avatarFile);

    try {
      const res = await fetch(`${API_BASE_URL}/api/users/me`, {
        method: "PUT",
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        body: formPayload,
      });
      const data = await res.json();
      if (res.ok && user) {
        alert(data.message);
        const updatedUser = { ...user, ...data.data };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        window.dispatchEvent(
          new CustomEvent("avatarUpdated", { detail: updatedUser })
        );
        setIsDialogOpen(false);
      } else setError(data.message || "Cập nhật thất bại");
    } catch {
      setError("Lỗi hệ thống!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setFormData(user || {});
    setError("");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-white flex justify-center py-12 px-4">
      <div className="w-full max-w-lg bg-white/90 backdrop-blur-md rounded-3xl shadow-lg p-8 border border-pink-100">
        <h2 className="text-3xl font-bold mb-6 text-center text-pink-500">
          Thông tin cá nhân
        </h2>

        <div className="flex flex-col items-center mb-6">
          <div className="relative">
            <img
              src={
                user.avatar ? `${API_BASE_URL}${user.avatar}` : defaultAvatar
              }
              alt={user.username}
              className="w-28 h-28 rounded-full border-2 border-pink-300 mb-4 cursor-pointer hover:opacity-80 transition"
              onClick={handleAvatarClick}
            />
            {isAvatarLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                <span className="text-white text-sm">Đang tải...</span>
              </div>
            )}
          </div>
          {avatarError && <p className="text-red-500 text-sm">{avatarError}</p>}
          <input
            ref={avatarInputRef}
            type="file"
            accept="image/*"
            onChange={handleAvatarFileChange}
            className="hidden"
          />
          <h3 className="text-xl font-semibold text-gray-800">
            {user.username}
          </h3>
          <p className="text-gray-500 text-sm">
            Ngày tạo:{" "}
            {user.created_at
              ? new Date(user.created_at).toLocaleDateString()
              : "Chưa có"}
          </p>
        </div>

        <div className="flex flex-col space-y-3 mb-6">
          <div className="flex justify-between px-4 py-2 border rounded-lg bg-pink-50">
            <span className="font-medium text-gray-700">Tên:</span>
            <span className="text-gray-800">{user.username}</span>
          </div>
          <div className="flex justify-between px-4 py-2 border rounded-lg bg-pink-50">
            <span className="font-medium text-gray-700">Họ và tên:</span>
            <span className="text-gray-800">{user.full_name || "Chưa có"}</span>
          </div>
          <div className="flex justify-between px-4 py-2 border rounded-lg bg-pink-50">
            <span className="font-medium text-gray-700">Email:</span>
            <span className="text-gray-800">{user.email}</span>
          </div>
          <div className="flex justify-between px-4 py-2 border rounded-lg bg-pink-50">
            <span className="font-medium text-gray-700">Số điện thoại:</span>
            <span className="text-gray-800">{user.phone || "Chưa có"}</span>
          </div>
          <div className="flex flex-col px-4 py-2 border rounded-lg bg-pink-50">
            <span className="font-medium text-gray-700 mb-1">Địa chỉ:</span>
            <span className="text-gray-800">{user.address || "Chưa có"}</span>
          </div>
        </div>

        <div className="flex flex-col space-y-3 mb-4">
          <Button
            className="bg-blue-500 hover:bg-blue-600 text-white"
            onClick={() => setIsDialogOpen(true)}
          >
            Chỉnh sửa thông tin
          </Button>
          {user.role === "admin" && (
            <Link
              to="/manage-page"
              className="w-full text-center py-2 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold"
            >
              Trang quản lý
            </Link>
          )}
          <Link
            to="/"
            className="w-full text-center py-2 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-semibold"
          >
            Quay về trang chủ
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-center py-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold"
          >
            Đăng xuất
          </button>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Chỉnh sửa thông tin cá nhân</DialogTitle>
            </DialogHeader>
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            <div className="space-y-3 py-2">
              <div>
                <label className="text-sm text-gray-700">Tên</label>
                <Input
                  value={formData.username || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="text-sm text-gray-700">Họ và tên</label>
                <Input
                  value={formData.full_name || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, full_name: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="text-sm text-gray-700">Email</label>
                <Input
                  value={formData.email || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-sm text-gray-700">Số điện thoại</label>
                <Input
                  value={formData.phone || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-sm text-gray-700">
                  Tỉnh / Thành phố
                </label>
                <select
                  value={formData.province || ""}
                  onChange={(e) => handleProvinceChange(Number(e.target.value))}
                  className="w-full border p-2 rounded-md"
                >
                  <option value="">Chọn Tỉnh/Thành phố</option>
                  {provincesData.map((p) => (
                    <option key={p.code} value={p.code}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-700">Quận / Huyện</label>
                <select
                  value={formData.district || ""}
                  onChange={(e) => handleDistrictChange(Number(e.target.value))}
                  className="w-full border p-2 rounded-md"
                  disabled={!districts.length}
                >
                  <option value="">Chọn Quận/Huyện</option>
                  {districts.map((d) => (
                    <option key={d.code} value={d.code}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-700">Xã / Phường</label>
                <select
                  value={formData.ward || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, ward: Number(e.target.value) })
                  }
                  className="w-full border p-2 rounded-md"
                  disabled={!wards.length}
                >
                  <option value="">Chọn Xã/Phường</option>
                  {wards.map((w) => (
                    <option key={w.code} value={w.code}>
                      {w.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={handleDialogClose}>
                Hủy
              </Button>
              <Button
                className="bg-pink-500 hover:bg-pink-600 text-white"
                onClick={handleSave}
                disabled={isLoading}
              >
                {isLoading ? "Đang lưu..." : "Lưu"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Profile;
