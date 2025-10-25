/* eslint-disable react-refresh/only-export-components */
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react"; // Thêm useCallback
import axios from "axios";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  cartCount: number;
  fetchCart: () => Promise<void>;
  addToCart: (item: CartItem) => Promise<void>;
  removeItem: (id: number) => Promise<void>;
  clearCart: () => void;
  removingItems: Set<number>; // Thêm: Track items đang xóa
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [removingItems, setRemovingItems] = useState<Set<number>>(new Set()); // Thêm: State cho loading remove

  // 🧩 Memoize fetchCart để tránh re-create function
  const fetchCart = useCallback(async () => {
    const token = localStorage.getItem("token");
    console.log("🔍 fetchCart: Token =", token ? "có" : "không");
    if (!token) {
      setCartItems([]);
      setCartCount(0);
      return;
    }

    try {
      const res = await axios.get("http://localhost:3000/api/orders/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("✅ fetchCart: Full Response =", res.data); // Log toàn bộ response
      const items: CartItem[] = res.data.items || res.data.data?.items || []; // Kiểm tra cả res.data.items và res.data.data.items
      console.log("✅ fetchCart: Items =", items);
      setCartItems(items);
      setCartCount(items.reduce((sum, i) => sum + i.quantity, 0));
      console.log(
        "✅ fetchCart: cartCount =",
        items.reduce((sum, i) => sum + i.quantity, 0)
      );
    } catch (error) {
      console.error("❌ fetchCart: Lỗi =", error);
      if (axios.isAxiosError(error)) {
        console.log(
          "❌ fetchCart: Status =",
          error.response?.status,
          "Data =",
          error.response?.data
        );
        if (error.response?.status === 401) {
          window.dispatchEvent(new Event("logout"));
        }
      }
    }
  }, []); // Dependency rỗng vì không phụ thuộc gì

  // 🧩 Thêm sản phẩm (async, await POST trước)
  const addToCart = async (item: CartItem) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Vui lòng đăng nhập trước khi thêm sản phẩm!");
      return;
    }

    try {
      console.log("🔍 addToCart: Gửi POST cho item =", item);
      const res = await axios.post(
        "http://localhost:3000/api/orders/cart",
        { product_id: item.id, quantity: item.quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("✅ addToCart: POST Response =", res.data); // Log response POST
      console.log("✅ addToCart: POST thành công, update state");

      // Update state sau POST
      setCartItems((prev) => {
        const existing = prev.find((i) => i.id === item.id);
        if (existing) {
          return prev.map((i) =>
            i.id === item.id
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          );
        }
        return [...prev, item];
      });
      setCartCount((prev) => prev + item.quantity);
    } catch (err) {
      console.error("❌ addToCart: Lỗi =", err);
      alert("Lỗi khi thêm sản phẩm vào giỏ. Vui lòng thử lại.");
    }
  };

  // 🧩 Xóa sản phẩm (sửa: cập nhật local, thêm loading, sửa endpoint)
  const removeItem = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Vui lòng đăng nhập!");
      return;
    }

    setRemovingItems((prev) => new Set(prev).add(id));

    try {
      await axios.delete(`http://localhost:3000/api/orders/cart/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const itemToRemove = cartItems.find((item) => item.id === id);
      if (itemToRemove) {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
        setCartCount((prev) => prev - itemToRemove.quantity);
      }
    } catch (error) {
      console.error("❌ Lỗi khi xóa sản phẩm:", error);
      alert("Xóa sản phẩm thất bại, thử lại sau.");
      await fetchCart();
    } finally {
      setRemovingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  // 🧩 Xóa giỏ hàng
  const clearCart = () => {
    setCartItems([]);
    setCartCount(0);
    localStorage.removeItem("cart");
  };

  // 🧩 Load từ localStorage khi mount
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    console.log("🔍 useEffect mount: localStorage cart =", storedCart);
    if (storedCart) {
      try {
        const items: CartItem[] = JSON.parse(storedCart);
        setCartItems(items);
        setCartCount(items.reduce((sum, i) => sum + i.quantity, 0));
        console.log(
          "✅ Loaded from localStorage: cartCount =",
          items.reduce((sum, i) => sum + i.quantity, 0)
        );
      } catch (err) {
        console.error("❌ Lỗi parse localStorage:", err);
      }
    }
  }, []);

  // 🧩 Lưu vào localStorage khi cartItems thay đổi
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    console.log("💾 Saved to localStorage: cartItems =", cartItems);
  }, [cartItems]);

  // 🧩 Đồng bộ giỏ hàng khi login/logout/load trang
  useEffect(() => {
    fetchCart();
    window.addEventListener("storage", fetchCart);
    window.addEventListener("login", fetchCart);
    window.addEventListener("logout", () => {
      setCartItems([]);
      setCartCount(0);
      localStorage.removeItem("cart");
    });
    return () => {
      window.removeEventListener("storage", fetchCart);
      window.removeEventListener("login", fetchCart);
      window.removeEventListener("logout", () => {});
    };
  }, [fetchCart]); // Thêm fetchCart vào dependency

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        fetchCart,
        addToCart,
        removeItem,
        clearCart,
        removingItems, // Thêm: Export để dùng trong component
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart phải được dùng trong CartProvider");
  return context;
};
