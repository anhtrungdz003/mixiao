import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
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

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

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

  useEffect(() => {
    fetch("https://provinces.open-api.vn/api/p/")
      .then((res) => res.json())
      .then((data) => setProvincesData(data))
      .catch((err) => console.error(err));
  }, []);

  // Khi chọn Tỉnh (ĐÃ SỬA: Tránh NaN)
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
      .catch((err) => console.error(err));
  }, []);

  // Khi chọn Huyện (ĐÃ SỬA: Tránh NaN)
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
      .catch((err) => console.error(err));
  }, []);

  // Save thông tin
  const handleSave = async () => {
    if (!formData.username || !formData.email) {
      alert("Vui lòng nhập đầy đủ Họ & tên và Email!");
      return;
    }

    const fullAddress = `${
      wards.find((w) => w.code === formData.ward)?.name || ""
    }, ${districts.find((d) => d.code === formData.district)?.name || ""}, ${
      provincesData.find((p) => p.code === formData.province)?.name || ""
    }`;

    const formPayload = new FormData();
    formPayload.append("username", formData.username);
    formPayload.append("email", formData.email);
    formPayload.append("phone", formData.phone || "");
    formPayload.append("address", fullAddress);

    if (formData.avatarFile) {
      formPayload.append("avatar", formData.avatarFile); // file avatar
    }

    try {
      const res = await fetch(`http://localhost:3000/api/users/me`, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: formPayload,
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        const newUser = { ...user, ...data.user };
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
        setIsDialogOpen(false);
      } else {
        alert(data.message || "Cập nhật thất bại");
      }
    } catch (err) {
      console.error(err);
      alert("Lỗi hệ thống, không thể lưu thông tin");
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-white flex justify-center py-12 px-4">
      <div className="w-full max-w-lg bg-white/90 backdrop-blur-md rounded-3xl shadow-lg p-8 border border-pink-100">
        <h2 className="text-3xl font-bold mb-6 text-center text-pink-500">
          Thông tin cá nhân
        </h2>

        <div className="flex flex-col items-center mb-6">
          <img
            src={user.avatar || "https://i.pravatar.cc/100"}
            alt={user.username}
            className="w-28 h-28 rounded-full border-2 border-pink-300 mb-4"
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
            <span className="font-medium text-gray-700">Họ và tên:</span>
            <span className="text-gray-800">{user.username}</span>
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
            className="bg-blue-500 text-base hover:bg-blue-600 text-white"
            onClick={() => setIsDialogOpen(true)}
          >
            Chỉnh sửa thông tin
          </Button>

          {user.role === "admin" && (
            <Link
              to="/manage-page"
              className="w-full text-center py-2 rounded-xl bg-green-500 hover:bg-green-600 !text-white font-semibold shadow-md transition"
            >
              Trang quản lý
            </Link>
          )}

          <Link
            to="/"
            className="w-full text-center py-2 rounded-xl bg-pink-500 hover:bg-pink-600 !text-white font-semibold shadow-md transition"
          >
            Quay về trang chủ
          </Link>

          <button
            onClick={handleLogout}
            className="w-full text-center py-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold shadow-md transition"
          >
            Đăng xuất
          </button>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Chỉnh sửa thông tin cá nhân</DialogTitle>
            </DialogHeader>

            <div className="space-y-3 py-2">
              {/* Chọn Avatar */}
              <div>
                <label className="text-sm text-gray-700">Avatar</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setFormData({
                        ...formData,
                        avatarFile: e.target.files[0],
                      });
                    }
                  }}
                  className="w-full border p-2 rounded-md"
                />
                {formData.avatarFile && (
                  <img
                    src={URL.createObjectURL(formData.avatarFile)}
                    alt="preview"
                    className="w-20 h-20 rounded-full mt-2 border"
                  />
                )}
              </div>
              <div>
                <label className="text-sm text-gray-700">Họ và tên</label>
                <Input
                  value={formData.username || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
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

              {/* Địa chỉ: Province -> District -> Ward */}
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

              {/* Huyện */}
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

              {/* Xã */}
              <div>
                <label className="text-sm text-gray-700">Xã / Phường</label>
                <select
                  value={formData.ward || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      ward: Number(e.target.value),
                    }))
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
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Hủy
              </Button>
              <Button
                className="bg-pink-500 hover:bg-pink-600 text-white"
                onClick={handleSave}
              >
                Lưu
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Profile;
