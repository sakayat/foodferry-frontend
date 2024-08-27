import { create } from "zustand";

export const useCartStore = create((set) => ({
  isCartOpen: false,
  setIsCartOpen: (value) => set({ isCartOpen: value }),
}));


export const useCartItemStore = create((set, get) => ({
  token: localStorage.getItem("authToken"),
  cartItems: [],
  fetchCartList: async () => {
    const { token } = get();
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/cart/list/`,
      {
        method: "get",
        headers: {
          "Content-type": "application/json",
          Authorization: `Token ${token}`,
        },
      }
    );
    const data = await res.json();
    set({ cartItems: data });
  },
  clearCart: () => set({cartItems: []})
}));

export const useProfileStore = create((set, get) => ({
  token: localStorage.getItem("authToken"),
  user: {},
  fetchProfileInfo: async () => {
    const { token } = get();
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/accounts/profile/`,
      {
        method: "get",
        headers: {
          "Content-type": "application/json",
          Authorization: `Token ${token}`,
        },
      }
    );
    const data = await res.json();
    set({ user: data });
  },
}));

export const useOrderStore = create((set, get) => ({
  token: localStorage.getItem("authToken"),
  orderList: [],
  fetchOrderList: async () => {
    const { token } = get();
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/order-list/`,
      {
        method: "get",
        headers: {
          "Content-type": "application/json",
          Authorization: `Token ${token}`,
        },
      }
    );
    const data = await res.json();
    set({ orderList: data });
  },
}));

