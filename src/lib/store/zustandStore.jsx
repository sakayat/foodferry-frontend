import { create } from "zustand";

const token = localStorage.getItem("authToken");

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
  clearCart: () => set({ cartItems: [] }),
}));

export const useProfileStore = create((set) => {
  const fetchProfileInfo = async () => {
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
  };
  fetchProfileInfo();

  return {
    user: {},
  };
});

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

export const useRestaurantInfo = create((set) => {
  const fetchRestaurantInfo = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/restaurant/restaurant-info/`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Token ${token}`,
        },
      }
    );
    const data = await res.json();
    set({ ownerInfo: data });
  };
  fetchRestaurantInfo();
  return {
    ownerInfo: {},
  };
});

export const useFoodCategories = create((set) => {
  const fetchFoodCategories = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/restaurant/food-categories/`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Token ${token}`,
        },
      }
    );
    const data = await res.json();
    set({ foodCategories: data });
  };
  fetchFoodCategories();
  return {
    foodCategories: {},
  };
});

export const useFoodTags = create((set) => {
  const fetchFoodTags = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/restaurant/food-tags/`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Token ${token}`,
        },
      }
    );
    const data = await res.json();
    set({ foodTags: data });
  };
  fetchFoodTags();
  return {
    foodTags: {},
  };
});
