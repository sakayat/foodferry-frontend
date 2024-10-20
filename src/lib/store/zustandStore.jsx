import { create } from "zustand";

const token = localStorage.getItem("authToken");

export const useCartStore = create((set) => ({
  isCartOpen: false,
  setIsCartOpen: (value) => set({ isCartOpen: value }),
}));

export const useFoodItemsStore = create((set, get) => ({
  data: [],
  fetchFoodItems: async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/restaurant/foods/`
    );
    const data = await res.json();
    set({ data });
  },
}));

export const useCartItemStore = create((set, get) => ({
  token: localStorage.getItem("authToken"),
  cartItems: [],
  fetchCartList: async (newToken) => {
    
    if (!token) {
      set({ error: "Token not found." });
      return;
    }

    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/cart/list/`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Token ${newToken}`,
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
    if (!token) {
      set({ error: "Token not found." });
      return;
    }

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

export const useRestaurantInfo = create((set, get) => ({
  token: localStorage.getItem("authToken"),
  ownerInfo: {},
  fetchRestaurantInfo: async () => {
    const { token } = get();
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/restaurant/info/`,
      {
        method: "get",
        headers: {
          "Content-type": "application/json",
          Authorization: `Token ${token}`,
        },
      }
    );
    const data = await res.json();
    set({ ownerInfo: data });
  },
}));

export const useFoodCategories = create((set, get) => ({
  token: localStorage.getItem("authToken"),
  categories: [],
  fetchFoodCategories: async () => {
    const { token } = get();
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/restaurant/categories/`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Token ${token}`,
        },
      }
    );
    const data = await res.json();
    set({ categories: data });
  },
}));

export const useFoodTags = create((set) => ({
  token: localStorage.getItem("authToken"),
  foodTags: [],
  fetchFoodTags: async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/restaurant/tags/`,
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
  },
}));

export const useUsersStore = create((set, get) => ({
  token: localStorage.getItem("authToken"),
  users: [],
  fetchUsers: async () => {
    const { token } = get();
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
    const data = await res.json();
    set({ users: data });
  },
}));

export const useRestaurantListStore = create((set, get) => ({
  restaurantData: [],
  fetchRestaurants: async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/restaurant/list/`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    const data = await res.json();
    set({ restaurantData: data });
  },
}));

export const useFoodCategoriesStore = create((set, get) => ({
  token: localStorage.getItem("authToken"),
  categories: [],
  fetchCategories: async () => {
    const { token } = get();
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/restaurant/categories/`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Token ${token}`,
        },
      }
    );
    const data = await res.json();
    set({ categories: data });
  },
}));

export const useFoodTagStore = create((set, get) => ({
  token: localStorage.getItem("authToken"),
  tags: [],
  fetchTags: async () => {
    const { token } = get();
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/restaurant/tag-list/`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Token ${token}`,
        },
      }
    );
    const data = await res.json();
    set({ tags: data });
  },
}));

export const useRestaurantOrderStore = create((set, get) => ({
  token: localStorage.getItem("authToken"),
  orderList: [],
  fetchUserOrderList: async () => {
    const { token } = get();
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/user-order-list/`,
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

export const useRenderProfileInfoStore = create((set, get) => ({
  user: {},
  fetchProfileInfo: async (UserToken) => {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/accounts/profile/`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Token ${UserToken}`,
        },
      }
    );
    const data = await res.json();
    set({ user: data });
  },
  updateProfileInfo: async (data) => {
    const { token } = get();
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/accounts/profile/`,
      {
        method: "PUT",
        headers: {
          Authorization: `Token ${token}`,
        },
        body: data,
      }
    );
    if (res.ok) {
      get().fetchProfileInfo();
    }
  },
}));

export const useUserListStore = create((set, get) => ({
  token: localStorage.getItem("authToken"),
  users: [],
  fetchUsers: async () => {
    const { token } = get();
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/user-list/`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Token ${token}`,
        },
      }
    );
    const data = await res.json();
    set({ users: data });
  },
}));
